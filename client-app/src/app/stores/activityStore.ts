import { makeAutoObservable, runInAction } from "mobx"
import { Activity } from "../models/activity"
import agent from "../api/agent";
import {v4 as uuid} from 'uuid';

export default class ActivityStore {
    activityRegistry = new Map<string, Activity>(); // map list atividades
    selectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;
    submitting = false;

    constructor() {
        makeAutoObservable(this)
    }

    //computed property to return ordered data
    get activitiesByDate() {
        return Array.from(this.activityRegistry.values())
            .sort((a, b) => 
            Date.parse(a.date) - Date.parse(b.date));
    }

   loadActivities = async () => {
        try{
            const activities = await agent.Activities.list();
            activities.forEach(activity => {
                activity.date = activity.date.split('T')[0]; //tratamento date
                this.activityRegistry.set(activity.id, activity); //mapeando as atividades
              })
            this.setLoadingInitial(false)
        } catch (error) {
            console.log(error)
            this.setLoadingInitial(false)
        }
   }

   setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
   }

   selectActivity = (id: string) => {
        this.selectedActivity = this.activityRegistry.get(id);
   }

   cancelSelectedActivity = () => {
        this.selectedActivity = undefined;
   }

   openForm = (id?: string) => {
    id ? this.selectActivity(id) : this.cancelSelectedActivity();
    this.editMode = true;
   }

   closeForm = () => {
    this.editMode = false;
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
                if (this.selectedActivity?.id === id) this.cancelSelectedActivity; //caso delete, remove a visualização lateral do objeto selecionado.
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

