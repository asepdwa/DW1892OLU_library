import React, { useEffect, useState } from 'react'

export const Abc = () => {
    const [count, setCount] = useState(0);


    return (
        <div>
            <h1> Total Count: {count}</h1> <button onClick={() => setCount(count + 1)}>Tambah</button>
        </div>
    )
}
