import { Route, Routes } from 'react-router-dom'
import { CreateRoom } from '../pages/Room.jsx'

function App() {
  return (
<Routes>
<Route path="/create-room" element={<CreateRoom/>} />
</Routes>

  )
};

export default App