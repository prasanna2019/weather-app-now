/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import RNLocation from 'react-native-location';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Image
} from 'react-native';
import {
   Header, Content, Card, CardItem,Body, Title
} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      temp:'',
      name:'',
      isLoading:true,
      main:'',
      img:'',
      sunrise:'',
      sunset:'',
      error:false
    };
    this.getTime = this.getTime.bind(this);
  }
  componentDidMount(){
  
    RNLocation.configure({
      distanceFilter: 5.0
    })
    
    RNLocation.requestPermission({
      ios: "whenInUse",
      android: {
        detail: "coarse"
      }
    }).then(granted => {
        if (granted) {
          this.locationSubscription = RNLocation.subscribeToLocationUpdates(locations => {
           // console.log(locations[0].latitude);
            fetch('https://api.openweathermap.org/data/2.5/weather?lat='+locations[0].latitude+'&lon='+locations[0].longitude+'&units=metric&appid=c5bf7febc4a583309f817fb3497d746d')
            .then(response => response.json())
            .then((myJson) => {
            //  console.log(myJson);
             this.setState({sunrise:myJson.sys.sunrise,sunset:myJson.sys.sunset, img:myJson.weather[0].icon,pressure: myJson.main.pressure, humidity:myJson.main.humidity, temp:myJson.main.temp, name:myJson.name, isLoading:false, main:myJson.weather[0].main, temp_max:myJson.main.temp_max, temp_min:myJson.main.temp_min })
            })
            .catch(function() {
              this.setState({isLoading:false, error:true})
          });
          
          })
        }
      })

  }
  render(){
    if(this.state.isLoading){
      return (
        <ImageBackground source={require('./background.jpg')} style={{width:'100%', height:'100%'}}>
         
       <ActivityIndicator size="large" color="#0000ff" />
    </ImageBackground>
      )
    }
    if(this.state.error){
      return (
        <View style={styles.sectionContainer}>
       <Text>Please try again later</Text>
    </View>
      )
    }
    //console.log(this.state.name)
    return(
    
      <ImageBackground source={require('./background.jpg')} style={{width:'100%', height:'100%'}}>
      <ScrollView>
     
         <Content padder>
         <Header>
          <Body>
            <Title>{this.state.name} </Title>
          </Body>
    
        </Header>
           <Card >
           
             <CardItem bordered style={{backgroundColor:'skyblue'}}>
               <Body>
                 <View style={{flex:1, flexDirection:'row'}}>
                   <View style={{padding:'3%'}}>
                     <Text style={styles.sectionTitle}> {this.state.main}</Text>
                   
                     <Text style={{fontSize:30, color:'yellow'}}> {this.state.temp} &#8451;</Text>
                      <View style={{flex:1, flexDirection:'row'}}>
                        <Text style={styles.sectionDetail}>max {this.state.temp_max} &#8451; min {this.state.temp_min} &#8451;</Text>
                     </View>
                   </View>
                   <Image  source={{uri:"https://openweathermap.org/img/wn/" + this.state.img + ".png"}} style={{width:'30%', height:'30%'}} />
                 </View>
               </Body>
             </CardItem>
             
           </Card>
           
           <Card>
           
           <CardItem bordered style={{backgroundColor:'skyblue'}}>
             <Body>
               <View>
                 <View style={{padding:'3%'}}>
                   <Text style={styles.sectionDetail}> Sunrise: {this.getTime(this.state.sunrise).substring(0,5)}</Text>
                   <Text style={styles.sectionDetail}> Sunset: {this.getTime(this.state.sunset).substring(0,5)}</Text>
                 </View>
                
               </View>
             </Body>
           </CardItem>
           
         </Card>
 
         <Card>
           
           <CardItem bordered style={{backgroundColor:'skyblue'}}>
             <Body>
             <View  style={styles.cardContent} >
           <View style={{padding:'3%'}}>
             <Text style={styles.sectionDetail}> Humidity: {this.state.humidity}%</Text>
             <Text style={styles.sectionDetail}> Pressure: {this.state.pressure} mbar</Text>
 
           </View>
         </View>
             </Body>
           </CardItem>
           
         </Card>
           
         </Content>
 
         </ScrollView>
         </ImageBackground>
    )
  }
  getTime(time){
    var dateObj = new Date(time * 1000); 
    return dateObj.toLocaleTimeString();
  }
}

const styles = StyleSheet.create({
 
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '600',
    color: 'yellow',
    textTransform: 'uppercase',
    paddingBottom:20
  },
  sectionDetail: {
    fontSize: 23,
    fontWeight: '600',
    color: 'yellow',
    paddingTop:12,
  },
  icons:{
    color:'white', 
    fontSize:45, 
    marginRight:6 
  }
});

export default App;

