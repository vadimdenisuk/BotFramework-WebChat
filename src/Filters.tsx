import * as React from "react";
import { ChatState } from './Store';
import { connect } from 'react-redux';
import {uniq} from 'lodash';

class FiltersView extends React.Component<any,any> {
    render() {
        return (
            <select value={this.props.selectedUserId} onChange={event => this.props.onUserSelect(event.target.value)}>
                <option value={""}>All</option>
                {this.props.userIds.map( (id: any, index: number) =>
                    <option key={index} value={id}>{id}</option>
                )}
            </select>
            )
    }
}
export const Filters = connect(
    (state: ChatState) => ({
        userIds: uniq(state.history.activities.reduce((ids: Array<string>, activity: any) => {
            try{
                ids.push(activity.attachments[0].content.userid)
            }
            catch (e){

            }
            return ids;
        }, [])),
        user: state.connection.user,
        selectedUserId: state.shell.selectedUserId
    }), {
        onUserSelect: (userId: string) => ({ type: 'User_Select', userId})
    }
)(FiltersView);
