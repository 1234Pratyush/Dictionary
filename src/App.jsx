import React, { useState } from 'react';
import axios from "axios";

const Counter = () => {
    const [word, setWord] = useState("");
    const [apiRes, setApires] = useState(null);
    const [error, setError] = useState(null);

    const searchWord = async (event) => {
        event.preventDefault();
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        console.log("URL", url);

        try {
            const formatedRes = await axios.get(url);
            console.log("formatedResponse: ", formatedRes);
            setApires(formatedRes.data[0]);
            setError(null);
        } catch (error) {
            console.error("Error fetching the word:", error);
            setApires(null);
            setError("Word not found. Please check your spelling.");
        }
    }

    return (
        <div className='h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600'>
            <div className='bg-white shadow-2xl rounded-lg p-8 w-[600px]'>
                <h1 className='text-3xl font-bold text-center text-gray-800 mb-6'>Dictionary App</h1>
                <form onSubmit={searchWord} className='flex items-center space-x-4 mb-6'>
                    <input
                        type="text"
                        placeholder="Enter a word"
                        className='flex-1 border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:border-purple-500'
                        onChange={(event) => setWord(event.target.value)}
                        value={word}
                    />
                    <button type='submit' className='bg-purple-500 text-white px-5 py-3 rounded-lg hover:bg-purple-600'>
                        Search
                    </button>
                </form>

                {error && (
                    <p className='text-red-500 text-center'>{error}</p>
                )}

                {apiRes && (
                    <div className='mt-6'>
                        <h1 className='text-2xl font-bold text-gray-800'>Word: {apiRes.word}</h1>
                        <h2 className='text-lg text-gray-600 mt-2'>Phonetic: {apiRes.phonetic}</h2>
                        <h2 className='text-lg text-gray-600 mt-2'>Meaning: {apiRes.meanings[0]?.definitions[0]?.definition}</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Counter;
