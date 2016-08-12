import React, { Component } from 'react';
import ReactDom from 'react-dom';



class TaskSingle extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $('.space').sortable({
            connectWith:'.space',
            tolerance:'intersect',
            handle: ".fa-arrows",
            // placeholder: "ph"
            // revert: true
            // beforeStop: function(ev, ui) {
            //     if ($(ui.item).hasClass('hasItems') && $(ui.placeholder).parent()[0] != this) {
            //         $(this).sortable('cancel');
            //     }
            // }
            update: function(ev, ui) {
                console.log(ui);
                console.log(ui.item.parent(".space").sortable( "toArray" ));
            }
        });

        $('.space').disableSelection();

            // $('.singletask-group').sortable({
            //     handle: ".fa-arrows",
            // });

    }

    renderTasks(tasks) {
        // console.log(tasks);
        if(undefined==tasks) return true;
        return tasks.map((task) => {
            return (
                <TaskSingle key={task.id} data={task} />
            );
        });
    }


    render() {
        
        return (
            <div className="hasItems singletask-group sortable" id={'t_'+this.props.data.id}>
                <div className="singletask">
                    <div className="inner">
                        <div className="controls left">
                            <a href="#"><i className="fa fa-arrows"></i></a>
                            <a href="#"><i className="fa fa-pencil"></i></a>
                            <a href="#"><input type="checkbox" /></a>
                        </div>
                        <div className="title">
                            {this.props.data.task_title}

                            <span className="persons-assigned">
                                <a href="#">Aman</a>
                                <a href="#">Ryan</a>
                            </span>
                            <span className="tags">
                                <span className="label label-primary">Primary <a title="Remove Tag" href="#" className="remove">x</a></span>
                                <span className="label label-primary">Primary <a title="Remove Tag" href="#" className="remove">x</a></span>
                            </span>
                        </div>

                        <div className="controls right">
                            <a href="#"><i className="fa fa-indent"></i></a>
                            <a href="#"><i className="fa fa-exclamation-circle"></i></a>
                            <a href="#"><i className="fa fa-tags"></i></a>
                        </div>
                    </div>
                </div>

                <div className="space">
                    {this.renderTasks(this.props.data.children)}
                </div>
            </div>
        
        );
    }
}


export default TaskSingle;
