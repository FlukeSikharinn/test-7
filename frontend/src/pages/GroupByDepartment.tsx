import React, { useEffect, useState } from 'react';
import Title from '../components/Title'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify'

interface User {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: 'male' | 'female';
    hair: { color: string };
    address: { postalCode: string };
    company: { department: string };
}

interface GroupByData {
    [department: string]: {
        male: number;
        female: number;
        maxAge: number;
        minAge: number;
        hair: Record<string, number>;
        addressUser: Record<string, string>;
    };
}

const GroupByDepartment: React.FC = () => {

    const [data, setData] = useState<GroupByData | null>(null);

    useEffect(() => {
        const dataFromApi = async () => {
            const response = await fetch('https://dummyjson.com/users');
            const result = await response.json();
            const users: User[] = await result.users || [];

            const groupedData = users.reduce<GroupByData>((departments, user) => {
                const { department } = user.company;
                if (!departments[department]) {
                    departments[department] = { male: 0, female: 0, maxAge: 0, minAge: 0, hair: {}, addressUser: {} };
                }

                departments[department][user.gender] += 1;
                
                if (user.age > departments[department].maxAge) {
                    departments[department].maxAge = user.age;
                }
                if (user.age < departments[department].minAge || departments[department].minAge === 0) {
                    departments[department].minAge = user.age;
                }

                departments[department].hair[user.hair.color] = (departments[department].hair[user.hair.color] || 0) + 1;

                const fullName = `${user.firstName}${user.lastName}`;
                departments[department].addressUser[fullName] = user.address.postalCode;

                return departments;
            }, {});
            
            setData(groupedData);
        };

        dataFromApi();
    }, []);

    const copyData = () => {
        if (data) {
            const dataString = JSON.stringify(data, null, 2);
            navigator.clipboard.writeText(dataString)
                .then(() => {
                    toast.success('Copied successfully!!');
                })
                .catch(() => {
                    toast.error('Failed!');
                });
        }
    };
    

    return (
        <div>
            <div className="bg-white flex flex-col md:flex-row w-full text-sm mb-10">
                <div className="flex-1 border px-10 md:px-10 sm:px-2 py-2 sm:py-7 flex flex-col gap-5 md:pb-10">
                    <div className='text-xl'>
                        <Title text1={'Group By'} text2={'Department'} />
                    </div>
                    <div className="flex-1 border text-xl border-gray-400 rounded-lg p-[69px] py-7 bg-white mx-10 min-h-[500px] max-h-[500px] overflow-y-auto mb-2 relative">
                        <p onClick={copyData} className="absolute top-10 right-10 -translate-y-1/2 translate-x-1/2 hover:scale-110 transition ease-in-out cursor-pointer w-[3.5rem] h-[3.5rem] text-center leading-4 bg-gray-300 text-white rounded-md text-[8px] flex items-center justify-center">
                            <FontAwesomeIcon icon={faCopy} className="text-[30px] text-gray-500" />
                        </p>
                        {data ? (
                            Object.entries(data).map(([department, details]) => (
                                <div key={department}>
                                    {`{`}
                                    <div className='pl-8'>
                                        <h3>[{department}] : {`{`}</h3>
                                        <div className='pl-8'>
                                            <p>"male": {details.male},</p>
                                            <p>"female": {details.female},</p>
                                            <p>"ageRange": {details.minAge}{details.maxAge !== details.minAge ? `-${details.maxAge}` : ''} ,</p>
                                            <div>"hair": {`{`} <br />
                                                {Object.entries(details.hair).map(([color, count]) => (
                                                    <div key={`${department}-${color}`}>
                                                        <span className="pl-8 mr-2">"{color}": {count},</span>
                                                        <br />
                                                    </div>
                                                ))}
                                            </div>
                                            <p>{`},`}</p>
                                            <p>"addressUser": {`{`}</p>
                                            <ul className='pl-8'>
                                                {Object.entries(details.addressUser).map(([name, postal]) => (
                                                    <li key={`${department}-${name}`}>"{name}": "{postal}"</li>
                                                ))}
                                            </ul>
                                            <p>{`},`}</p>
                                        </div>
                                    </div>
                                    {`},`}
                                </div>
                            ))
                        ) : (
                            <div className="animate-pulse space-y-4">
                                <div className="w-32 h-6 bg-gray-200 rounded"></div>
                                <div className="space-y-3">
                                    <div className="w-full h-6 bg-gray-200 rounded"></div>
                                    <div className="w-full h-6 bg-gray-200 rounded"></div>
                                    <div className="w-full h-6 bg-gray-200 rounded"></div>
                                </div>
                                <div className="w-full h-6 bg-gray-200 rounded"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupByDepartment;
