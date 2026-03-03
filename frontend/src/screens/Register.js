import react from 'react';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,ScrolView, ScrollView,ActivityIndicator} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useState,useEffect} from 'react';
import {registerUser} from '../services/services';
//Traemos el servicio para poder registrar el usuario desde el frontend,que es la función que hemos creado en services.js,que se encarga de hacer la petición a la API para registrar el usuario en la base de datos

export default function Register({}){
         const [nombre,setNombre]=useState('');
         const [apellido,setApellido]=useState('');
            const [email,setEmail]=useState('');
            const [password,setPassword]=useState('');
            const [confirmPassword,setConfirmPassword]=useState('');
            const [message,setMessage]=useState('');
            //Tenemos los hooks necesarios para manejar el esatdo de los campos formularios
           //Antes de empezar con la lógica de los hooks,vamos a poner una pantalla de carga
          const handleClick=async()=>{
              if(!nombre || !apellido || !email || !password || !confirmPassword){
                   setMessage('Por favor,complete todos los campos');
                   
              }
              else if(password!==confirmPassword){
                   setMessage('Las contraseñas no coinciden');
              }
                else{
                    await registerUser(nombre,email,password,'user');
                    setNombre('');
                    setApellido('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');
                    setMessage('');
                }

          }
            return(
                <View style={styles.Container}>
                    <ScrollView style={styles.FormStyle}>
                        <View style={styles.ViewStyle}>
                            <Text style={styles.TitleStyle}>Registro</Text>
                           
                        </View>
                        <View>
                            <TextInput style={styles.TextInput} placeholder="Nombre" value={nombre} onChangeText={setNombre}/>
                        </View>
                        <View>
                            <TextInput style={styles.TextInput} placeholder="Apellido" value={apellido} onChangeText={setApellido}/>
                        </View>
                        <View>
                            <TextInput style={styles.TextInput} placeholder="Email" value={email} onChangeText={setEmail}/>
                        </View>
                        <View>
                            <TextInput style={styles.TextInput} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true}/>
                        </View>
                        <View>
                            <TextInput style={styles.TextInput} placeholder="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry={true}/>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.ButtonStyle} onPress={handleClick}>
                                <Text style={{color: 'white'}}>Registrar</Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            {message ? <Text>{message}</Text> : null}
                        </View>
                    </ScrollView>
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
        
      },
      TitleStyle:{
        fontSize:24,
        fontWeight:'bold',
        marginBottom:20,
        marginTop:20,
        margin:0,
        alignContent:'center',
        textAlign:'center',


      },
      ViewStyle:{
        width:'100%',
        marginBottom:20,
        padding:20,
        borderRadius:10,
        backgroundColor:'#f2f2f2',
        
      },
      FormStyle:{
        width:'100%',
        marginBottom:20,
        padding:20,
        borderRadius:10,
        backgroundColor:'#f2f2f2',
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
      }
})