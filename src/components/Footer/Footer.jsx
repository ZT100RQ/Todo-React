import {Component} from 'react';
import "./Footer.css"
import TasksFilter from "../TasksFilter/TasksFilter";
import PropTypes from 'prop-types';


class Footer extends Component {

  

    render() {
        const {
            changeFilter = () => {},
            clearCompleted = () => {}, 
            activeTodos = []} = this.props


        return (
            <footer className="footer">
                <span className="todo-count">{activeTodos ? `${activeTodos} todo left` : `0 todo left`}</span>
                <TasksFilter 
                  changeFilter={changeFilter}
                    
                />
                <button className="clear-completed" onClick={() => clearCompleted()}>Clear completed</button>
            </footer>
        )
    }
}

Footer.propTypes = {
    activeTodos: PropTypes.number,
    changeFilter: PropTypes.func,
    clearCompleted: PropTypes.func
}

export default Footer;