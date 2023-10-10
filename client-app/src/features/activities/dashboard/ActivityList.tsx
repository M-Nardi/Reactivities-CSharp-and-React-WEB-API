import React, { SyntheticEvent, useState } from "react";
import {
  Button,
  Item,
  ItemDescription,
  ItemExtra,
  Label,
  Segment,
} from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";


export default observer (function ActivityList() {
  const {activityStore} = useStore();

  const [target, setTarget] = useState('');

  function handleActivityDelete(e: SyntheticEvent<HTMLButtonElement>, id: string){
    setTarget(e.currentTarget.name);
    activityStore.deleteActivity(id);
  }

  return (
    <Segment>
      <Item.Group divided>
        {activityStore.activitiesByDate.map((activity) => (
          <Item key={activity.id}>
            <Item.Content>
              <Item.Header as="a">{activity.title}</Item.Header>
              <Item.Meta>{activity.date}</Item.Meta>
              <ItemDescription>
                <div>{activity.description}</div>
                <div>
                  {activity.city}, {activity.venue}
                </div>
              </ItemDescription>
              <ItemExtra>
                <Button
                  as={Link} to={`/activities/${activity.id}`}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Button
                  name = {activity.id}
                  loading = {activityStore.loading && target === activity.id}
                  onClick={(e) => handleActivityDelete(e, activity.id)}
                  floated="right"
                  content="Delete"
                  color="red"
                />
                <Label basic content={activity.category} />
              </ItemExtra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
})
