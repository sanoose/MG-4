 ///////////// Start Variables 
let Container = document.querySelector('.Container') ;
let img_container =Array.from(document.querySelector(`.Container`).children) ;
var my_interval  ;
var Order_Array1 = [] ; 
let duration = 700;
let decrease = 1000 ;

let Result = document.querySelector(`.txt_container   .Result span`) ;
let player_name  = "";
let txt_player_name = document.querySelector(`.form1 .txt`) ;
let btn_Start = document.querySelector(`.start span`) ;
let btn_ok = document.querySelector(`.start .form1 .btn_Ok`) ;
let form = document.querySelector(`.start .form1 `) ;
let btn_try_again = document.querySelector(` .txt_container .try_again `) ;
let Table_div = document.querySelector('.Wins_List') ;
let Tabble_Body = document.querySelector('.Wins_List  tbody ') ;
let btn_Easy  = document.querySelector(' .start   .Easy') ;
let btn_Normal = document.querySelector('.start   .Normal  ') ;
let Reload = document.querySelector('.txt_container  img') ;
let Easy_Boolean = false ; 
let Normal_Boolean = false ;
let Temp = "" ;
let array1 = [] ;
    // [...document.querySelectorAll('.img_box')].forEach(function(el){
    //         el.classList.add("is-flipped") ;
    // });
    

RandomImages() ;

// window.localStorage.clear() ;
if (window.localStorage.getItem('data1'))
{
    array1 = JSON.parse(window.localStorage.getItem('data1'));
} else 
{  window.localStorage.setItem("data1" , "[]") ;}

 ///////////// End  Variables 

/// Start Start Game Form 
btn_Start.onclick = function(){
    btn_Start.remove() ;
    btn_Easy.style.display = 'inline' ;
    btn_Normal.style.display = 'inline' ;

 
}

btn_Easy.onclick = function(){
    Easy() ;
}
btn_Easy
btn_Normal.onclick = function(){
    Normal()  ;
}
txt_player_name.onkeypress = function(e)
 { if  (  e.keyCode === 13 ) {  OK() ;}}

btn_ok.onclick = function(){ OK() ;  };
/// End  Start Game Form 

Reload.onclick = function() {
    let b = confirm('سيتم اعادة تشغيل اللعبة من جديد هل انت متاكد ؟') ; 
    console.log(b) ;
    if (b) {window.location.reload(); }

}

for(let i = 0 ; i < img_container.length ; i ++) {
    Order_Array1[i] = i ;
}

Order_shuffle1(Order_Array1) ;
ordering_imgs () ;

// Start Functions 
function ordering_imgs () {
    img_container.forEach(function(el,index){
        // Flip(el) ; // or el.onclick   then call Flip with out argument

        el.onclick = function(){
            if (!el.classList.contains(`is-flipped`))
           { document.getElementById('Flip1').play() ;}
            el.classList.add(`is-flipped`) ;
    
            let click_filtter = img_container.filter(function(f){
                return f.classList.contains('is-flipped') ; 
            });
            if(click_filtter.length === 2 ) {
                stop_Clicking() ;
                success_Checking(click_filtter[0] , click_filtter[1]) ;
                // document.querySelectorAll(`S_class`) ;
            }
         }
        el.style.order = Order_Array1[index] ;
      
    }) ; 
}

// function Flip(el){
// }

function Order_shuffle1 (array) {
    let current_length = array.length  , 
    random , Temp ;

    while ( current_length > 0 ) {
        random = Math.floor(Math.random() * current_length) ;
        current_length -- ;

        Temp = array[current_length] ;
        array[current_length]  = array[random] ;
        array[random]  =  Temp ;
    }
    return array ;
}

function stop_Clicking(){
    Container.classList.add('double_Click');
    setTimeout(() => {
        Container.classList.remove('double_Click');
    }, 900);
  
}

function success_Checking(el1 , el2){
    if (el1.dataset.img ==  el2.dataset.img)
    {  
        document.getElementById('success').play() ; // success sound
        setTimeout(() => {
            el1.classList.add('S_class') ;
            el2.classList.add('S_class') ;
            el1.classList.remove('is-flipped') ;
            el2.classList.remove('is-flipped') ; 
            // console.log(document.querySelectorAll(` .Container_All  .S_class`).length) ;
            // console.log(document.querySelectorAll(` .Container_All  .img_box`).length) ;
            if (document.querySelectorAll(` .Container_All  .S_class`).length == 
            document.querySelectorAll(` .Container_All  .img_box`).length)
            {
                array1.push({PlayerName : document.querySelector('.txt_container .name').innerHTML , 
                    PlayerTime  : document.querySelector('.txt_container  .timer_container .minite').innerHTML
                    +":"+
                    document.querySelector('.txt_container  .timer_container .Second').innerHTML   ,   
                    player_Time_Converted :  parseInt(  document.querySelector('.txt_container  .timer_container .Second').innerHTML) + 
                     parseInt( document.querySelector('.txt_container  .timer_container .minite').innerHTML * 60 ) ,
          });
         window.localStorage.setItem('data1' , JSON.stringify(array1)); 
                  Honor_List_Sort() ;
                Game_Over('You Win') ; 
            }
        }, duration);

    } else { 
        
        // document.getElementById('Fial').play() ; // Fail Sound s

        Result.innerHTML = parseInt(Result.innerHTML) - 1 ;
        if (parseInt(Result.innerHTML) === 0 ){
                
            if(
            document.querySelector('.txt_container  .timer_container .minite').innerHTML !== '0'
            ||
            document.querySelector('.txt_container  .timer_container .Second').innerHTML !== '0'
            )
            {
                // console.log(document.querySelector('.txt_container  .timer_container .minite').innerHTML) ;
                // console.log( document.querySelector('.txt_container  .timer_container .Second').innerHTML) ;
                Honor_List_Sort() ;
                Game_Over('Tries is Over') ;
                setTimeout(() => {
                    show_only() ;   
                }, 1000);
               
               
            }
             }
        setTimeout(() => {
            el1.classList.remove('is-flipped') ;
            el2.classList.remove('is-flipped') ;
         
            },duration)

       
    }
}

function Game_Over(type_Of_End) {
  
    if (type_Of_End === 'Tries is Over') {
        document.querySelector(` .txt_container  .timer_container`).style.color  = 'red' ;
    }
    else {
        document.querySelector(` .txt_container  .timer_container`).style.color  = 'yellow' ;
    }
    Temp = document.querySelector(` .txt_container  .timer_container`).innerHTML ;
    document.querySelector(` .txt_container  .timer_container`).innerHTML = type_Of_End ; // =>  'Tries is Over'   
    Container.classList.add('double_Click');
    document.querySelector(`.cover`).style.display = 'block' ;
    setTimeout(() => {
        btn_try_again.style.display = 'inline' ; 
    }, 1000);
   
    clearInterval(my_interval) ;
}


function Time(){
let get_second = document.querySelector('.txt_container span .Second') ;
let get_minites = document.querySelector('.txt_container  span .minite ') ;
let second = parseInt(get_second.innerHTML) ;
let minites= parseInt(get_minites.innerHTML) ;
// console.log(second) ;
     my_interval =  setInterval(() => {
        second ++ ;
        if (parseInt(Result.innerHTML) == 0)
        {clearInterval(my_interval);}
        if (second == 60 )
        {
                minites++ ;
                second = 0 ;
         } 
         get_second.innerHTML = second ; 
         get_minites.innerHTML = minites ;
    }, decrease);
}


function Remove_Table_Elements () {
    Array.from(Tabble_Body.children).forEach(function(el , i){
        if (i!==0)
         {   el.remove() ;}
    });
}

function Honor_List_Sort(){         // this will Add And Sort Element In Honor List  
 
    let array_List = JSON.parse(window.localStorage.getItem("data1")) ;

        if (array_List.length >= 2 ) {
        for (let i = 0 ; i< array_List.length - 1  ; i++){
            for  (let j = i + 1 ; j< array_List.length ; j++){
                if (parseInt(array_List[i].player_Time_Converted) > parseInt (array_List[j].player_Time_Converted) )
                {
                        let Temp = array_List[i] ;
                        array_List[i]=  array_List[j]   ;
                        array_List[j]   = Temp ;
                } 
            }
        }
        Add_Data_To_Table()
        } else {Add_Data_To_Table() ;}

  function Add_Data_To_Table() {
   
    Remove_Table_Elements () ;  // this will remove The Previes Element From Table To Add The new 
    for (let i = 0 ; i < array_List.length ; i++) {
        if (i > 9 ) {break ;}
        let tr = document.createElement('tr') ;
        let td_name = document.createElement('td') ;
        let td_Time = document.createElement('td') ;
        let td_rank = document.createElement('td'); 
        td_name.innerHTML = array_List[i].PlayerName ; 
        td_Time.innerHTML = array_List[i].PlayerTime ;
        td_rank.innerHTML = (i+1) ;
        tr.appendChild(td_Time) ;
        tr.appendChild(td_name  ) ;
        tr.appendChild(td_rank ) ; 
         Tabble_Body.appendChild(tr)  ;
         Table_div.style.transform = 'translate(-50% , -50%)' ;
    }
    window.localStorage.setItem('data1', JSON.stringify(array_List)) ;
    // console.log(array_List) ;
}
}

function Reset()
{   
    
    Table_div.style.transform = 'translate(-50% , -1200%)' ;
    // Remove_Table_Elements () ;
    
    document.querySelector(` .txt_container  .timer_container`).style.color  = 'white' ;
    btn_try_again.style.display='none' ;
    Order_shuffle1(Order_Array1) ;
   
    document.querySelector(` .txt_container  .timer_container`).innerHTML = Temp ;
    document.querySelector('.txt_container  .timer_container .minite').innerHTML= 0 ;
    document.querySelector('.txt_container  .timer_container .Second').innerHTML = 0;
  
    Result.innerHTML = 8 ;
      img_container.forEach(function(el){
        el.classList.remove('S_class');
        el.classList.remove('is-flipped');
    } ) ;

    setTimeout(() => {
        RandomImages() ;
        Container.classList.remove('double_Click');
        document.querySelector(`.cover`).style.display = 'none' ;
        ordering_imgs () ; 
        Select_Difficult () ;
        // document.querySelector(`.cover`).style.display = 'none' ;
    },600);
   
}

function RandomImages() {
    let  Get_Random_Images =  Math.ceil(Math.random() * 4) ;
    console.log(Get_Random_Images) ;
    switch (Get_Random_Images) {
        case 1 :  
        [...document.querySelectorAll('.img_box img')].forEach(function(e,i){
            e.setAttribute('src' ,"Images/M1/"+(i+1).toString()+".jpg") ;
        }) ;  break ; 
         
        case 2 : 
        [...document.querySelectorAll('.img_box img')].forEach(function(e,i){
            e.setAttribute('src' ,"Images/M2/"+(i+1).toString()+".jpg") ;
        }) ;  break ; 

        case 3 : 
        [...document.querySelectorAll('.img_box img')].forEach(function(e,i){
            e.setAttribute('src' ,"Images/M3/"+(i+1).toString()+".jpg") ;
        }) ;  break ; 

        case 4 :
            [...document.querySelectorAll('.img_box img')].forEach(function(e,i){
                e.setAttribute('src' ,"Images/M4/"+(i+1).toString()+".jpg") ;
            }) ;  break ; 

        // case 5 : 
        // [...document.querySelectorAll('img')].forEach(function(e,i){
        //     e.setAttribute('src' ,"Images/M5/"+(i+1).toString()+".jpg") ;
        // }) ;  break ; 

        // case 6 : 
        // [...document.querySelectorAll('img')].forEach(function(e,i){
        //     e.setAttribute('src' ,"Images/M6/"+(i+1).toString()+".jpg") ;
        // }) ;  break ; 
    }
       }

       function show_only() {
        [...document.querySelectorAll('.img_box')].forEach(function(el){
            el.classList.add("is-flipped") ;
    }); 
}
    function Un_show_only() {
        [...document.querySelectorAll('.img_box')].forEach(function(el){
            el.classList.remove("is-flipped") ;
       }) ; 
    } 
   
       function Show_And_UnShow(){
        show_only()  ;
        setTimeout(() => {
        Un_show_only() ;
         Time() ;  // Start Timer 
    }, 2000);
    }


    function Select_Difficult () {
        if (Easy_Boolean)
        {  Show_And_UnShow(); 
          Time() ;}
          else if (Normal_Boolean)
          {   Time() ; }
        }


        function Easy() {
            btn_Easy.remove() ;
            btn_Normal.remove() ;
            form.style.display = 'flex';
            Normal_Boolean = false ;  Easy_Boolean = true ;
            txt_player_name.focus() ;
        }

        function Normal() {
            btn_Easy.remove() ;
            btn_Normal.remove() ;
            form.style.display = 'flex';
            Normal_Boolean = true ;  Easy_Boolean = false;
            txt_player_name.focus() ;
        }

        function OK () {
            player_name = txt_player_name.value ; 
            if (player_name === null || player_name === "")
            {
         document.querySelector('.txt_container .name').innerHTML +=  'Unknown';
        
            } else {
                document.querySelector('.txt_container .name').innerHTML += player_name ;
            }
            document.querySelector(`.start`).style.display = 'none' ;
          
            Select_Difficult () ; 
        }
// End Functions 

    btn_try_again.addEventListener('click', Reset ) ;



    document.addEventListener("dragstart" , (e)=>{
e.preventDefault() ;
    })


