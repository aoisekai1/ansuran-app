/** START Check Type Data */
/**
 * function isArray check type data array
 * @param data Array
 * return boolean
 */
export function isArray(data){
    return Array.isArray(data);
}

/** START Session */
/**
 * function setSession to set session
 *  @param keyname string/Array
 *  @param data Array/Object 
*/
export function setSession(keyname, data=null){
    let hashKeyName = '';
    if(isArray(keyname)){
      if(keyname.length == data.length){
        for(let x in keyname){
          hashKeyName = keyname[x].toString();
          localStorage.setItem(hashKeyName, JSON.stringify(data[x]));
        }
      }else{
        for(let x in keyname){
          let len = (x - 1) == -1 ? 0 : (parseInt(x) + 1) - 1;
          if(len < data.length){
            hashKeyName = keyname[x].toString();
            localStorage.setItem(hashKeyName, JSON.stringify(data[len]));
          }else{
            hashKeyName = keyname[x].toString();
            localStorage.setItem(hashKeyName, JSON.stringify({}));
          }
        }
      }
    }else{
      hashKeyName = keyname.toString();
      localStorage.setItem(hashKeyName, JSON.stringify(data));
    }
    
  
    return false;
}
  
/**
 * function getSession to get session
 *  @param keyname String/Array
 * return Array
 */
export function getSession(keyname){
    let session = {};
    if(isArray(keyname)){
        for(let x in keyname){
        let key = keyname[x];
        session[key] = JSON.parse(localStorage.getItem(keyname[x].toString()));
        }
    }else{
        session = JSON.parse(localStorage.getItem(keyname.toString()));
    }
    if(!session){
        console.log('Ops, Session has not been set');
    }

    return session;
}

/**
 * function removeSession to remove Specific session
 *  @param keyname String/Array
 */
 export function removeSession(keyname){
    if(isArray(keyname)){
        for(let x in keyname){
        localStorage.removeItem(keyname[x]);
        }
    }else{
        localStorage.removeItem(keyname);
    }

    console.log('Session has been remove');

    return false;
}
  
/**
 * function clearAllSession to remove all session
 *  @param keyname string
 */
export function clearAllSession(){
    localStorage.clear();

    return false;
}

/** END Session*/

export function typeAnsuran(param){
    let data = [
                {code:1,ansuran: "Kebakaran"},
                {code:2,ansuran: "Gempa"},
                {code:3,ansuran: "Kendaraan Bermotor"},
                {code:4,ansuran: "Kebakaran"},
                {code:5,ansuran: "Kecelakaan Diri"},
                {code:6,ansuran: "kesehatan"}
            ]
    if(param){
        let findVal = data.find(({code}) => code == param);
        return findVal;
    }else{
        return data;
    }
}

/**Start Format Currency*/
/**
 *  function formatCurrency()
 *  @param numberCurrency  string | number
 *  @param currencyType string default value is IDR
 *  @param showCurrencyType bolean
 *  @param showSymbolCurrency bolean
 *  @param showDec bolean
 * 
 * */
 export function FormatCurrency(numberCurrency=0, currencyType=null, showCurrencyType=false, showSymbolCurrency=false, showDec=false){
	let currency = '';
    currencyType = !currencyType ? 'IDR' : currencyType;
    //Check null value numberCurrency
    if(!numberCurrency){ 
        console.log("Ops, value cannot be null");
        return;
    }
    //convert integer to  string
    numberCurrency = numberCurrency.toString();
    //Replace all symbol
    numberCurrency = numberCurrency.replace(/[^\w\s]| /gi, '');
    let arrCurrency = [
        {'currencyType':'idr', 'symbol' : 'Rp'},
        {'currencyType':'usd', 'symbol': '$'},
        {'currencyType':'sgd', 'symbol': '$'},
        {'currencyType':'jpy', 'symbol': '¥'},
        {'currencyType':'cny', 'symbol': '¥'},
        {'currencyType':'eur', 'symbol': '€'},
        {'currencyType':'myr', 'symbol': 'Rm'}
    ]
    let toLowerString = currencyType.toLowerCase();
    //Filter currency type 
    let resCurrency = arrCurrency.filter(item => item.currencyType.indexOf(toLowerString) > -1);
    //Check data resCurrency
    let isNotEmpty = resCurrency.length > 0 ? true : false;
    //Sparator for indonesia and malaysia (".")
    let symbolSparator =(toLowerString == 'idr' || toLowerString == 'myr') ? '.':',';;
    //Show code currency when showCurrencyType is true
    let symbolCurrency = showCurrencyType ? currencyType : '';
    let currDec = '';
    //Check and show symbol currency
    if(isNotEmpty && showCurrencyType){
        symbolCurrency = showSymbolCurrency ? resCurrency[0].symbol:resCurrency[0].currencyType.toLocaleUpperCase();
        currDec = showDec ? resCurrency[0].currencyType == 'idr' || resCurrency[0].currencyType == 'myr' ? ',00':'.00' :''
    }
    
    //create array from number currency and sort by desc
    let numSplit = numberCurrency.split("").reverse();
    let arrNum = [];
    let currNum = '';
    for(let x in numSplit){
        if(!(x%3) && x != 0){
            arrNum.push(currNum);
        arrNum.push(symbolSparator);
        }else{
            arrNum.push(currNum);
        }
        
        currNum = numSplit[x];
    }
  
    currency = symbolCurrency+" "+numSplit[numSplit.length - 1]+arrNum.reverse().join("")+currDec;
  
    return currency;
}
/**END Format Currency*/

/**
* funtion getFormatDate() some @params
* @param date | string
* @param formaDate | string
* return can be in the form only date or date time
* default form date is 'Y-m-d'
*/
export function FormatDateTime(date=null, formatDate='Y-m-d'){
    date = !date ?  new Date() : new Date(date);
    
    let arrFormatDate = ['Y-m-d','d-m-Y','Y/m/d','d/m/Y','d-M-Y','Y-M-d', 'd/M/Y','Y/M/d','Y M d','d M Y','Y-m-d H:i:s','Y-m-d H:i','d-m-Y H:i:s','d-m-Y H:i','Y/m/d H:i:s','d-M-Y H:i:s','d-M-Y H:i','Y-M-d H:i','Y-M-d H:i:s','Y/M/d H:i:s','Y/M/d H:i','Y/m/d H:i','Y','m','d','H:i:s','H:i','H','i','s'];
    let checkFormatDate = arrFormatDate.indexOf(formatDate) > -1;
       let result = '';
    if(!checkFormatDate){
        return 'Ops, sorry format date wrong';
    }
    
    let findFormatDate = arrFormatDate.find(item => item == formatDate);
          
    let isSpace = formatDate.indexOf(' ') > -1;
    let regSymbol = new RegExp(' ','gi');
    
    //Change string to array
    let arrString = findFormatDate.split(regSymbol);
    let arrDate = [];
    if(isSpace){
        for(let x in arrString){
        let resultFormatDate = _checkFormatDate(arrString[x], date);
        arrDate.push(resultFormatDate);
      }
    }else{
        let resultFormatDate = _checkFormatDate(formatDate,  date);
      arrDate.push(resultFormatDate);
    }
    
    result = arrDate.join(' ');
    return result;
  }
  
  function _checkFormatDate(formatDate, date){
      let getYear = date.getFullYear();
    let getMonth = date.getMonth() + 1;
    let getDate =  date.getDate();
    let getHour = date.getHours();
    let getMinute =  date.getMinutes();
    let getSecond = date.getSeconds();
    
    let monthNames = ["Jan", "Feb", "March", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    
      getMonth = getMonth.toString().length > 1 ? getMonth : `0${getMonth}`;
    getDate = getDate.toString().length > 1 ? getDate : `0${getDate}`;
    getHour = getHour.toString().length > 1 ? getHour : `0${getHour}`;
    getMinute = getMinute.toString().length > 1 ? getMinute : `0${getMinute}`;
    getSecond = getSecond.toString().length > 1 ? getSecond : `0${getSecond}`;
    
    let regSymbol = new RegExp('-|/|:|','gi');
      let dataFormatDate = formatDate.split(regSymbol);
    let newFormatDate = formatDate;
    //Check special character comma from format date
    let regComma = new RegExp(',', 'gi');
    //extract array string
    for(let x in dataFormatDate){
        let stringDate = dataFormatDate[x].replace(regComma, '');
      let specialChar = new RegExp(stringDate, 'gi');
      let dateTime = '';
      //Check initial from format date
      if(stringDate == 'Y'){
          dateTime = getYear;
      }else if(stringDate == 'm'){
          dateTime = getMonth;
      }else if(stringDate == 'd'){
          dateTime = getDate;
      }else if(stringDate == 'M'){
          dateTime = monthNames[date.getMonth()];
      }else if(stringDate == 'H'){
          dateTime = getHour;
      }else if(stringDate == 'i'){
          dateTime = getMinute;
      }else if(stringDate == 's'){
          dateTime = getSecond;
      }
      
      //Replace format date
      newFormatDate = newFormatDate.replace(specialChar,dateTime);
    }
    
    return newFormatDate;
  }
  /**End Get Format Date*/

export function listPriode(){
    let data = [
        {priode: 1},
        {priode: 2},
        {priode: 3},
        {priode: 4},
        {priode: 5},
        {priode: 6},
        {priode: 7},
        {priode: 8},
        {priode: 9},
        {priode: 10}
    ]

    return data
}

export function validateForm(obj){
    let status = true;
    let msg = "Required field "
    let msgField = [];

    Object.keys(obj).forEach(function(key){
        if(obj[key] == ""){
            status = false;
            msgField.push("<p style='margin:0;padding:0'><i class='fa fa-warning'></i> "+msg+key+"</p>");
        }
    })
    
    msg = msgField.join().replace(/\s*,\s*|\s+,/g,"")
    
    return {status:status, msg:msg};
}

export function getFloat(value) {
    return value && value['$numberDecimal'] ? value['$numberDecimal'] : 0;
}

export function sprintf1(theString, argumentArray) {
    var regex = /%s/;
    var _r=function(p,c){return p.replace(regex,c);}
    return argumentArray.reduce(_r, theString);
}

var sprintf = (str, ...argv) => !argv.length ? str : 
    sprintf(str = str.replace(sprintf.token||"$", argv.shift()), ...argv);

export function GenerateInvoice(invoice){
    let PREFIX = "K.001.";
    let LAST_DIGIT = "00000";
    let index = 0;
    if(invoice == "" || typeof invoice == "undefined"){
        index++
        LAST_DIGIT = index.toString().padStart(5, '0');
    }else{
        index++;
        let sliceInvoice = invoice.split(".");
        let padNum = parseInt(sliceInvoice[2])+index;
        LAST_DIGIT = padNum.toString().padStart(5, '0');
    }
    
    return PREFIX+LAST_DIGIT;
}

export function GenerateNoPolis(no_polis=""){
    let PREFIX = "BSP01.01.F15.20.";
    let LAST_DIGIT = "00000";
    let index = 0;
    if(no_polis == "" || typeof no_polis == "undefined"){
        index++;
        LAST_DIGIT =  index.toString().padStart(5, '0');
        // console.log(no_polis);
    }else{
        index++;
        let sliceNoPolis = no_polis.split(".");
        let padNum = parseInt(sliceNoPolis[4])+index;
        
        LAST_DIGIT = padNum.toString().padStart(5, '0');
    }

    return PREFIX+LAST_DIGIT+".0";
}
