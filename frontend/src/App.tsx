import './index.css'
import Title from './components/Title'
import AutoTodoList from './pages/AutoTodoList'
import GroupByDepartment from './pages/GroupByDepartment'
import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[11vw]'>
        <div className='text-4xl text-center pt-[100px] border-t mb-5'>
            <Title text1={'Frontend'} text2={'Assignment'} />
        </div>
        <div className='text-2xl pt-8 mb-3'>
            <Title text1={'1.'} text2={'Auto Delete Todo List'} />
        </div>
        <AutoTodoList />
        <hr />
        <div className='text-2xl pt-10 mb-3'>
            <Title text1={'2.'} text2={'Create data from API (OPTIONAL)'} />
        </div>
        <GroupByDepartment />
        <ToastContainer />
        <hr className='mt-5' />
        <div className='text-4xl text-center pt-[100px] border-t mb-5'>
            <Title text1={'Backend'} text2={'Challenge'} />
        </div>
        <div className='text-2xl pt-8 mb-3'>
            <Title text1={'1.'} text2={'จงหาเส้นทางที่มีค่ามากที่สุด'} />
        </div>
    </div>
  )
}

export default App
