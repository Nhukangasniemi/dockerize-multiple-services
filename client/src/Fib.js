import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Fib = () => {
    const [seenIndexes, setseenIndexes] = useState([])
    const [values, setvalues] = useState({})
    const [index, setindex] = useState('')

    const fetchValues = async () => {
        const values = await axios.get('/api/values/current');
        setvalues(values.data)
    }

    const fetchIndexes = async () => {
        const seenIndexes = await axios.get('/api/values/all');
        setseenIndexes(seenIndexes.data)
    }

    const renderValues = () => {
        const entries = [];
        for (let key in values) {
            entries.push(
                <div key={key}>
                For index {key} I calculated {values[key]}
                </div>
            )
        }
        return entries
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/values', {
            index: index
        })
        setindex('')
    }

    useEffect(() => {
        fetchValues()
        fetchIndexes()
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>Enter your index:</label>
            <input value={index} onChange={(e) => setindex(e.target.value)}/>
            <button>Submit</button>
            </form>

            <h3>Indexes I have seen:</h3>
            {seenIndexes.map((idx) => idx.number).join(',')}
            <h3>Calculated Values:</h3>
            {renderValues()}
        </div>
    )
}

export default Fib