import ListOfUsers from './components/ListOfUsers';
import CreateNewUser from './components/CreateNewUser';
import { Toaster } from 'sonner';


function App() {
  return(
    <div className="max-w-[800px] h-screen mx-auto">
        <ListOfUsers />
        <CreateNewUser />
        <Toaster richColors />
    </div>
  )
}

export default App
