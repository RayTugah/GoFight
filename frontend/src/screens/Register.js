import react from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ScrolView, ScrollView,ActivityIndicator,KeyboardAvoidingView} from 'react-native';

import {useState,useEffect} from 'react';
import {registerUser} from '../services/services';
import Button from '../components/Button';
import TextInputComponent from '../components/TextInput';
import {useNavigation} from '@react-navigation/native';
import {Ionicons} from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ErrorMsg from '../components/ErrorMsg';




//Traemos el servicio para poder registrar el usuario desde el frontend,que es la función que hemos creado en services.js,que se encarga de hacer la petición a la API para registrar el usuario en la base de datos

export default function Register({}){
         const [nombre,setNombre]=useState('');
         
            const [email,setEmail]=useState('');
            const [password,setPassword]=useState('');
            const [confirmPassword,setConfirmPassword]=useState('');
            const [message,setMessage]=useState('');
            const [laoding,setLoading]=useState(false);

            //Tenemos los hooks necesarios para manejar el esatdo de los campos formularios
           //Antes de empezar con la lógica de los hooks,vamos a poner una pantalla de carga
           //Vamos a simular una pantalla de carga durante 2-3 segundos
        //Empezamos metiendo un UseEffect para simular la pantalla de carga
        useEffect(()=>{
            setLoading(true);
            setTimeout(()=>{
                //Simulamos una carga de 2-3 segundos
                setLoading(false);
                //Indicamos que la carga ha termiando,para que se muestre la pantalla de registro
            },2000);
        },[]);
         if(laoding){
            return(
                <View style={styles.LoadingContainer}>
                    <ActivityIndicator size="large" color="#ff0000"/>
                </View>
            )


         }
         const navigation=useNavigation();
          //Vamos a implemenatar la lógica para navegar a la pantalla de login
          const handleToLogin=()=>{
                navigation.navigate('login');
          }
          const handleClick=async()=>{
              if(!nombre  || !email || !password || !confirmPassword){
                   setMessage('Por favor,complete todos los campos');
                   
              }
              else if(password!==confirmPassword){
                   setMessage('Las contraseñas no coinciden');
              }
               try{
                 
                    await registerUser(nombre,email,password,'user');
                    setNombre('');
                    
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setMessage('');
                      alert('Registro exitoso,ahora puedes iniciar sesión');
                      navigation.navigate('home');
                      
              
               }catch(error){
                    setMessage(`Error al registrar el usuario: ${error.message}`);
               }

          }
          
        

            return(
                <View style={styles.Container}>
                    <View style={styles.FlexView}>
                        <Text style={styles.TitleStyle}>GoFight</Text>
                        

                    </View>
                    
                       

                    <KeyboardAvoidingView style={styles.FormStyle}>
                      <Text style={styles.RegistrarseText}>Registrarse</Text>
                        <TextInputComponent placeholder="Nombre" value={nombre} onChangeText={setNombre} iconName="person-outline"/>
                        <TextInputComponent placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" iconName="mail-outline"/>
                        <TextInputComponent placeholder="Contraseña" value={password} onChangeText={setPassword} secureTextEntry iconName="lock-closed-outline"/>
                        <TextInputComponent placeholder="Confirmar Contraseña" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry iconName="lock-closed-outline"/>
                        <Button title="Registrar" onPress={handleClick}/>
                        <TouchableOpacity onPress={handleToLogin}>
                            <Text style={styles.LinkStyle}>¿Ya tienes una cuenta?<Text style={styles.IniciarSesionText}>Iniciar Sesión</Text></Text>
                        </TouchableOpacity>
                       <View>
                        {message ? <ErrorMsg message={message}/> : null}
                        </View>

                    </KeyboardAvoidingView>
                </View>
            )
}


const styles=StyleSheet.create({
    //Vamos a definir los estilos para la pantalla de registro
      Container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        backgroundColor:'black',
        shadowColor:'rgba(255,0,0,0.5)',
        shadowOffset:{width:0,height:2},
        shadowOpacity:0.5,
        shadowRadius:12,
        elevation:5,
        
        
      },
      LoadingContainer:{
         flex:1,
         justifyContent:'center',
         alignItems:'center',
         backgroundColor:'black',
      },
      IconStyle:{
        marginLeft:10,
        marginTop:10,
        color:'red',
      },
      FlexView:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
      },
      RegistrarseText:{
        fontSize:20,
        fontWeight:'bold',
        marginBottom:20,
        color:'red',
        paddingTop:20,
        textAlign:'center',
        textShadowColor:'rgba(255,0,0,0.5)',
        },
      TitleStyle:{
        fontSize:24,
        fontWeight:'700',
        color:'#FF2233',
        marginBottom:20,
        marginTop:20,
        margin:0,
        alignContent:'center',
        textAlign:'center',
          textShadowColor:'rgba(255,34,51,0.5)',
          textShadowOffset:{width:2,height:2},
          textShadowRadius:10,
          textTransform:'uppercase',
          letterSpacing:3,
          textShadowColor:'#FF2233',
          textShadowOffset:{width:1,height:1},
          textShadowRadius:3,


      },
      ViewStyle:{
        width:'100%',
        marginBottom:20,
        padding:20,
        borderRadius:10,
        backgroundColor:'transparent',
        borderColor:'rgba(255,0,0,0.25)',


        
      },
      FormStyle:{
        width:'100%',
        marginBottom:20,
        padding:24,
        borderRadius:14,
        backgroundColor:'#0F0F0F',
        borderColor:'rgba(255,0,0,0.25)',
        borderWidth:1,
        boxShadow:'5px 20px 15px rgba(255,0,0,0.2)',
        shadowColor:'#FF2233',
        shadowOffset:{width:0,height:4},
        shadowOpacity:0.5,
        shadowRadius:10,
        elevation:5,


      },

      TextInput:{
        width:'100%',
        height:40,
        borderColor:'gray',
        borderWidth:1,
        marginBottom:10,
        borderRadius:5,
        paddingHorizontal:10,


      },
      ButtonStyle:{
        width:'100%',
        height:40,
        backgroundColor:'#007bff',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
      },
      Mensajes:{
        color:'red',
        marginBottom:10,
        textAlign:'center',
        borderColor:'red',
        borderWidth:1,
        padding:10,
        borderRadius:5,
        top:10,
        
      },
      LinkStyle:{
       fontSize:14,
        color:'#555555',
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center',
        marginTop:20,

      },
      IniciarSesionText:{
        color:'#127ccd',
        fontWeight:'bold',
        textDecorationLine:'underline',

      }

})
