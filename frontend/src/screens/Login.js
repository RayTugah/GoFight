//Vamos a crear la pantalla del login
import React from 'react';
import {View,Text,StyleSheet,ActivityIndicator,KeyboardAvoidingView} from 'react-native';
import {useState,useEffect} from 'react';
import Button from '../components/Button';
import TextInputComponent from '../components/TextInput';
import {useNavigation} from '@react-navigation/native';


import {loginUser} from '../services/services';
import ErrorMsg from '../components/ErrorMsg';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';

const Login=()=>{
    const navigation=useNavigation();
    //Vamos a implemtar el login,que va a ser una pantalla muy sencilla

      const [email,setEmail]=useState('');
       const [password,setPassword]=useState('');
       const [message,setMessage]=useState('');
       const [loading,setLoading]=useState(false);
       const handleLogin=async()=>{
           if(!email || !password){
                setMessage('Por favor,complete todos los campos');
                return;
           }
            try{
               await loginUser(email,password);
                setEmail('');
                setPassword('');
                setMessage('');
                navigation.navigate('home');
            }catch(error){
                setMessage('Error al iniciar sesión,compruebe que el email y la contraseña sean correctos');
                //Comprobamos que el email y la contraseña sean correctos
            }
       }
       useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        },2000);
       },[]);
       if(loading){
        return(
            <View style={styles.Container}>
                <ActivityIndicator size="large" color="#ff0000"/>
            </View>

        )

       }
       else{
          return(
            
           <KeyboardAvoidingView style={styles.Container} behavior="padding">
            <View style={styles.TitleContainer}>
                <Text style={styles.LogoStyle}>GoFight</Text>
                
            </View>
        
           
                <View style={styles.LoginContainer}>
                     <Text style={styles.TitleStyle}>Inciar Sesión</Text>
                    <TextInputComponent placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" iconName="mail-outline"/>
                    <TextInputComponent placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry iconName="lock-closed-outline"/>
                    <Button title="Iniciar Sesión" onPress={handleLogin}/>
                    <Text style={styles.Mensajes}>¿No tienes una cuenta? <Text style={styles.MensajeStyle} onPress={()=>navigation.navigate('register')}>Regístrate</Text></Text>
                    {message ? <ErrorMsg message={message}/> : null}
                </View>
           </KeyboardAvoidingView>
        )
       }
}
const styles=StyleSheet.create({
        ScrollViewStyle:{
            width:'80%',
            backgroundColor:'#f0f0f0',
            padding:20,
            borderRadius:10,
        },
        Container:{
            flex:1,
            justifyContent:'center',
            alignItems:'center',
            backgroundColor:'#080808',
            width:'100%',
           
           
        },
        LoginContainer:{
            width:'85%',
            backgroundColor:'#0F0F0F',
            padding:24,
            borderRadius:14,
            borderColor:'rgba(255,34,51,0.25)',
            borderWidth:1,
            gap:10,
            marginTop:20,
            shadowColor:'rgba(255,34,51,0.25)',
            shadowOffset:{width:0,height:4},
            shadowOpacity:0.5,
            shadowRadius:10,
            elevation:5,
            
        },
        LogoStyle:{
            fontSize:24,
            fontWeight:'bold',
            color:'#FF2233',
            letterSpacing:2,
            marginBottom:20,
            textTransform:'uppercase',
            textShadowColor:'rgba(255,34,51,0.5)',
            textShadowOffset:{width:2,height:2},
            textShadowRadius:10,


        },
        TitleStyle:{
            fontSize:18,
            fontWeight:'800',
            color:'#FF2233',
            letterSpacing:2,
            marginBottom:20,
            textTransform:'uppercase',
            textShadowColor:'rgba(255,34,51,0.5)',
            textShadowOffset:{width:2,height:2},
            textShadowRadius:10,
            textAlign:'center',
        },
            FormStyle:{
            width:'80%',
            backgroundColor:'#f0f0f0',
            padding:20,
            borderRadius:10,
        },
        Mensajes:{
            color:'#555555',
            marginTop:12,
            textAlign:'center',
            marginTop:4,
            
        },
        MensajeStyle:{
            color:'#0062ff',
            textDecorationLine:'underline',
           
        }
     
})
export default Login;