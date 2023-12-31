import { makeAutoObservable, runInAction } from "mobx"
import { Activity } from "../models/activity"
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';
import { format } from "date-fns";

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>(); // map list atividades
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    

    //computed property to return ordered data
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values())
            .sort((a, b) => a.date!.getTime() - b.date!.getTime());
    }

    // Obtenção de lista de atividades ordenada por data, reduce do array em objeto, associação de chave aos objetos por data.
    // Cada data terá um array de atividades que possuem a data correspondente
    get groupedActivities() {
        return Object.entries(
            this.activitiesByDate.reduce((activities, activity) => {
                const date = format(activity.date!, 'dd MMM yyyy'); //key do objeto
                activities[date] = activities[date] ? [...activities[date], activity] //verificação e adição do elemento  
                : [activity]; //caso negativo, cria novo array com a atividade
                return activities;
            }, {} as {[key: string]: Activity[]})
        )
    }

   loadActivities = async () => {
        this.setLoadingInitial(true);
        try{
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                this.setActivity(activity);
              })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
   }

   loadActivity = async (id: string) => {
        let activity = this.getActivity(id)
        if (activity) {
            this.selectedActivity = activity
            return activity;
        }
        else {
            this.setLoadingInitial(true)
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                runInAction(() => {
                    this.selectedActivity = activity})
                this.setLoadingInitial(false);
                return activity;
            } catch (error) {
                console.log(error)
                this.setLoadingInitial(false)
            }
        }
   }

   private setActivity = (activity: Activity) => {
    activity.date = new Date(activity.date!); //tratamento date
    this.activityRegistry.set(activity.id, activity); //mapeando as atividades
   }

   private getActivity = (id: string) => {
        return this.activityRegistry.get(id);
   }

   setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
   }

   createActivity = async (activity: Activity) => {
        this.loading = true;
        activity.id = uuid();
        try {
            await agent.Activities.create(activity);
            runInAction(() => {
                this.activityRegistry.set(activity.id, activity)
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction (() => {
                this.loading = false;
            })
        }
    }

    updateActivity = async (activity: Activity) => {
        this.loading = true;
        try {
            await agent.Activities.update(activity)
            runInAction (() => {
                // cria um novo array filtrando o id da atividade alterada e incluindo a atividade alterada
                this.activityRegistry.set(activity.id, activity);
                this.selectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction (() => {
                this.loading = false;
            })
        }
    }

    deleteActivity = async (id: string) => {
        this.loading = true;
        try {
            await agent.Activities.delete(id);
            runInAction(() => {
                this.activityRegistry.delete(id)
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}

