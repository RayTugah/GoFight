//Vamos a definir el header de la aplicación,que va a ser un componente esencial para casí todas las paginas
import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import { getUserProfile } from '../services/services';
import { useEffect, useState } from 'react';

     
const Header=()=>{
     const [userProfile,setUserProfile]=useState(null);
      useEffect(()=>{
        //Aquí vamos a definir la lógica para obtener el perfil del usuario
        const fetchUserProfile=async()=>{
            try{
                  const profile=await getUserProfile();
                    setUserProfile(profile);


            }catch(error){
                  console.error('Error al obtener el perfil del usuario',error);

            }
        }
        fetchUserProfile();
      },[]);
      return(
         <View style={style.HeaderContainer}>
            <MaterialCommunityIcons name='menu' size={24} color='white'/>
            <Text style={style.TextStyle}>GoFight</Text>
            <MaterialCommunityIcons name="account" size={24} style={style.IconStyle} />
            <Text style={style.TextStyle}>Bienvenido: {userProfile ? userProfile.perfilUsuario.nombre : 'Invitado'}</Text>
            <Text style={style.SubtitleStyle}>GoFight, tu entrenador personal</Text>
         </View>
      )
}
const style=StyleSheet.create({
      HeaderContainer:{
            flexDirection:'row',
            alignItems:'center',
            justifyContent:'center',
            flexWrap:'wrap',
            padding:10,
            backgroundColor:'#FF2233',
             borderBottomWidth:1,
             borderBottomColor:'red',
             gap:20,
             borderBottomColor:'#FF2233',
             shadowColor:'#FF2233',
             shadowOffset:{width:0,height:2},
                  shadowOpacity:0.5,      
                  shadowRadius:12,
                  elevation:5,
                  paddingTop:14,
                  borderRadius:5,
            

            
      },
      TextStyle:{
            fontSize:14,
            fontWeight:'bold',
            color:'white',
            textShadowColor:'black',
            textShadowOffset:{width:1,height:1},
            textShadowRadius:1,
            textTransform:'uppercase',
                  //Vamos a añadirle un efecto de luminosidad al texto
                  textShadowColor:'white',
                  textShadowOffset:{width:1,height:1},
                  textShadowRadius:3,



      },
      SubtitleStyle:{
            fontSize:10,
            color:'white',
            fontWeight:'bold',
            right:100,
            top:5,
            textShadowColor:'black',
            textShadowOffset:{width:1,height:1},
            textShadowRadius:1,
            //Vamos a añaduirle efecto de luminosuidad al texto
             textShadowColor:'white',
             textShadowOffset:{width:1,height:1},
             textShadowRadius:3,

      },
      IconStyle:{
             color:'red',
             marginLeft:10,
             marginTop:10,
             backgroundColor:'white',
             borderRadius:3,
             padding:2,
             
      }
})
export default Header;