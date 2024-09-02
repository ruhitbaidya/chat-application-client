import {Link, useNavigate} from "react-router-dom"
import { useForm } from "react-hook-form"
import { useContext } from "react"
import { UserContext } from "../UserAuth/UsersAuth"
const Login = () => {
    const {userLogin} = useContext(UserContext);
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) => {
        userLogin(data.email, data.password)
        .then((res)=>{
            if(res.user){
                navigate('/')
            }
        })
        .catch((err)=>{
            console.log(err)
        })
      }
    return (
        <div className="bg-[#0B0012]">
        <div className="container mx-auto px-[10px] h-screen flex justify-center items-center">
            <div className="w-[50%] mx-auto p-[50px] all-bg rounded-lg border text-white">
                <h2 className="text-2xl font-bold text-center">Wellcome</h2>
                <p className="text-center">Sign In Our Website And Explore</p>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-[10px]">
                            <label htmlFor="name">Email</label>
                            <input  {...register("email", { required: true })} className=" bg-transparent w-full p-[10px] border focus:outline-none" type="email" placeholder="Enter Your Email" />
                            {errors.email && <span>This field is required</span>}
                        </div>
                        <div className="mb-[10px]">
                            <label htmlFor="name">Password</label>
                            <input  {...register("password", { required: true })} className=" bg-transparent w-full p-[10px] border focus:outline-none" type="password" placeholder="Enter Your Password" />
                            {errors.password && <span>This field is required</span>}
                        </div>
                        <div className="mt-[30px]">
                           <button className="w-full border py-[8px]">SignUp</button>
                        </div>
                    </form>
                    <p className="mt-[15px]">If You Have No Account Please <Link className="text-blue-800" to="/register">SignUp</Link></p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Login
