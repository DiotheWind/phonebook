const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    const notificationStyle = {
        backgroundColor: 'lightgreen',
        height: 50,
        width: 350,
        fontFamily: 'arial, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }

    return (
        <div style={notificationStyle}>
            {message}
        </div>
    )
}

export default Notification
