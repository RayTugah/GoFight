//Aquí vamos a implementar la pantalla de incio
//Vamos a implementar cada uno de los componentes que vamos a utilizar en la pantalla de inicio
import React from 'react';
import {View,Text,StyleSheet,ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context'
import {useState,useEffect} from 'react';
import Button from '../components/Button';
import TextInputComponent from '../components/TextInput';
import Header from '../components/HeaderComponent';
import Footer from '../components/Footer';



const Home=()=>{
    //Vamos a implementar la pantalla de inicio,que va a ser básica y muy snecilla
     const [loading,setLoading]=useState(true);
     useEffect(()=>{
        //Aquí vamos a simular la pantalla de carga
        setTimeout(()=>{
             setLoading(false);
             //La función va esperar 2 segundos a que la carga termine
        },2000);
     },[]);
     if(loading){
         return(
               <View style={style.ActivityIndicatorStyle}>
                    <ActivityIndicator size="large" color="#ff0000"/>
               </View>
         )
     }
     else{
          return(
               <SafeAreaView style={style.Container}>
                     <Header/>
                     <View>
                     </View>

                     <Footer/>
                </SafeAreaView>
          )
     }
}
const style=StyleSheet.create({
     ActivityIndicatorStyle:{
          flex:1,
          justifyContent:'center',
          alignItems:'center',
          backgroundColor:'#080808'

     },
     Container:{
          flex:1,
          justifyContent:'space-between',
          
         

          
     }
})
export default Home;