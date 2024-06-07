import { useState } from "react"
import { useDispatch } from "react-redux"
import { createRestaurent} from '../features/restaurents/restaurentSlice'

function RestaurentForm() {
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [telephone, setTelephone] = useState('')

    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()
        const restaurentData = {name, address, telephone};
        dispatch(createRestaurent(restaurentData))
        setName('');
        setAddress('');
        setTelephone('');
    }
    return (
        <section className='form'>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlfor="name">Restaurent</label>
                    <input type="text" name="name" id="name" value={name} onChange={(e)=> setName(e.target.value)}/>
                    <label htmlfor="address">Address</label>
                    <input type="text" name="address" id="address" value={address} onChange={(e)=> setAddress(e.target.value)}/>
                    <label htmlfor="telephone">Telephone</label>
                    <input type="text" name="telephone" id="telephone" value={telephone} onChange={(e)=> setTelephone(e.target.value)}/>
                </div>
                <div className="form-group">
                    <button className="btn btn-block" type='submit'>Add Restaurent</button>
                </div>
            </form>
        </section>
  )
}

export default RestaurentForm