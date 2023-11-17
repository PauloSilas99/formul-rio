import React from 'react'
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Logo from './img/logo.svg'
import './App.css';


const schema = yup
  .object({
    name: yup.string().required("O nome é obrigatório"),
    email: yup.string().email("Digite um email valido").required("O email é obrigatório"),
    password: yup.string().min(6,"A senha deve ter 6 caracteres").required("A senha é obrigatória"),
    confirmPassword: yup.string().required("Confirme a senha").oneOf([yup.ref("password")],"As senhas devem ser iguais"),
  })
  .required()

function App() {
  const {
    register, handleSubmit, watch,formState: { errors },} = useForm({ resolver: yupResolver(schema)});

    function onSubimit(usuario){
      console.log(usuario);
    }
    
  return (
    <form onSubmit={handleSubmit(onSubimit)}>
     <img src={Logo} alt="img-logo"/>
     <h1>Formulário</h1>
     <label>
      Nome
     <input type="text" {...register("name",{ required: true })}/>
     <span>{errors.name?.message}</span>
     </label>
     
     <label>
      Email
     <input type="text" {...register("email",{required: true})}/>
     <span>{errors.email?.message}</span>
     </label>

     <label>
      Senha
     <input type="password" {...register("password",{required: true})}/>
     <span>{errors.password?.message}</span>
     </label>

     <label>
      Confirmar Senha
     <input type="password" {...register("confirmPassword",{required: true})}/>
     <span>{errors.confirmPassword?.message}</span>
     </label>

    <button type="subimit">Cadastrar-se</button>
    </form>
  );
}

export default App;
