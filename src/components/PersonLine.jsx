const PersonLine = ({ name, number, handleDeletion }) => {
    return (
        <div>
            <span>{name} {number}</span>
            <button onClick={handleDeletion}>Delete</button>
        </div>
    )
}

export default PersonLine
