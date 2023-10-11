import React from 'react';
import { Button, Icon, Item, Segment, SegmentGroup } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { Link } from 'react-router-dom';

interface Props {
    activity: Activity
}

export default function ActivityListItem({activity}: Props){

    return (
        <SegmentGroup>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/activities/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>Hosted by Alfredo</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {activity.date}
                    <Icon marker='clock' /> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Ateendes go here
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`/activities/${activity.id}`}
                    color='teal' 
                    floated='right'
                    content='View'
                    />
            </Segment>
        </SegmentGroup>
    )

}