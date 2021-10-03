function NotificationContent(props){
    return (
        <a style={{color: "rgb(105, 105, 105)", textDecoration: "none"}} target="_blank" href={props.contact}>Click to connect with {props.name}</a>
    )
}

export default NotificationContent;