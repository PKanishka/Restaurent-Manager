import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import RestaurentForm from '../components/RestaurentForm'
import RestaurentItem from '../components/RestaurentItem'
import Spinner from '../components/Spinner'
import {getRestaurents, reset} from '../features/restaurents/restaurentSlice'


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth);
  const {restaurents, isLoading, isError, message} = useSelector((state) => state.restaurents);

  useEffect(() => {
    if(isError){
      console.log(message);
    }
    if(!user){
      navigate('/login');
    }else{
    dispatch(getRestaurents());
    }
    return() => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if(!user || isLoading){
    return <Spinner/>
  }

  return<>
  <section className="heading">
    <h1>Welcome {user && user.name}</h1>
    <p>Restaurents Dashboard</p>
  </section>

  <RestaurentForm/>
  <section className="content">
    {restaurents.length > 0 ? (
      <div className="goals">
        {restaurents.map((restaurent) => (
          <RestaurentItem key={restaurent._id} restaurent={restaurent}/>
        ))}
      </div>

    ) : (<h3>You have no any restaurents</h3>)}
  </section>
  </>
}

export default Dashboard