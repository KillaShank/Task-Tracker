import Button from './Button'

const Header = ({ title , onAdd, toggle}) => {
    return (
        <header className="header">
            <h1>{title}</h1>
            <Button color =  {toggle ? 'Red' : 'Green'} text = {toggle ? 'Close' : 'Add Task'} onClick = {onAdd}/>
            
        </header>
    )
}

Header.defaultProps = {
    title : 'Task Tracker',
}


export default Header
