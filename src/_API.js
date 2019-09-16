import { EventRegister } from 'react-native-event-listeners';
import { Alert } from 'react-native';

const _ = require('lodash');

//import RNFS from 'react-native-fs';
//const pathWWW = RNFS.DocumentDirectoryPath + '/www';
//console.log('WWW ===', pathWWW); 

export default class _API {
    static myInstance = null;
    static getInstance() {
        var _self = this;
        if (_self.myInstance === null) {
            _self.myInstance = new _API();
            _self.myInstance._notify_Setup();

            //_self._notify_timer_reConnect = setInterval(function () {
            //    if (_self._NOTIFY_CONNECTED === false)
            //        _self.myInstance._notify_Setup();
            //}, 3000);
        }
        return _self.myInstance;
    }

    _is_encrypt_data = false;
    //=================================================================================

    _views = {
        Login: require('./f88_customer/Login').default,
        Home: require('./f88_customer/_Home').default,
        LoanFaster: require('./f88_customer/LoanFaster').default,
        PawnList: require('./f88_customer/PawnList').default,

        ScanQr: require('./f88_customer/ScanQr').default,
        UserProfile: require('./f88_customer/UserProfile').default,
        Splash: require('./f88_customer/Splash').default,
        Error500: require('./f88_customer/Error500').default,
        LoanFasterMessage: require('./f88_customer/LoanFasterMessage').default,
        Notify: require('./f88_customer/Notify').default,
        NotifyDetail: require('./f88_customer/NotifyDetail').default,
        MapUser: require('./f88_customer/MapUser').default,
        ChangePass: require('./f88_customer/ChangePass').default,
        SmsOtp: require('./f88_customer/SmsOtp').default,
        PawnDetail: require('./f88_customer/PawnDetail').default,
        CustomerNPS: require('./f88_customer/CustomerNPS').default,
        ForgetPassRequestSmsOTP: require('./f88_customer/ForgetPassRequestSmsOTP').default,
        ForgetPassCheckOTP: require('./f88_customer/ForgetPassCheckOTP').default,
        ForgetPassSubmit: require('./f88_customer/ForgetPassSubmit').default
    };

    _viewName = 'Login';
    //_viewName = 'Home';
    //_viewName = 'LoanFaster';
    //_viewName = 'PawnList';
    //_viewName = 'Notify';
    //_viewName = 'NotifyDetail';

    _viewPopupName = null;
    //_viewPopupName = 'ScanQr';
    //_viewPopupName = 'UserProfile';
    //_viewPopupName = 'Splash';
    //_viewPopupName = 'Error500';
    //_viewPopupName = 'LoanFasterMessage';
    //_viewPopupName = 'MapUser';
    //_viewPopupName = 'ChangePass';
    //_viewPopupName = 'PawnDetail';
    //_viewPopupName = 'CustomerNPS';
    //_viewPopupName = 'ForgetPassRequestSmsOTP';
    //_viewPopupName = 'ForgetPassCheckOTP';
    //_viewPopupName = 'ForgetPassSubmit';
    //_viewPopupName = 'SmsOtp'; //?????????????????????
    //=================================================================================
    //_HOST = '118.70.129.116:9098';
    _HOST = '192.168.10.21:9098';
    //_HOST = '192.168.11.205';
    //_HOST = '52.77.82.145';
    //_HOST = 'hoiso2.f88.vn:9098';
    //=================================================================================

    _user = {
        IsLogining: false,
        isQRCode: false,
        Active: false,
        SessionId: SessionId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }),
        UserId: 0,
        Token: '',
        SmsOTP: '',
        TokenFCM: '',
        EncryptKey: 'token',
        CaptchaImage: '',
        CustomerId: 0,
        //Avatar: require('@assets/v201/icons/ic_avatar.png'),
        Avatar: null,
        Fullname: 'Phùng Anh Tuấn',
        Username: '0948003456',
        Phone: '0948003456',
        Address: '',
        Online: false,
        IsNew: false,
        ShowNPS: false,
        IsLoanFaster: false,
        DateCreated: 0
    };

    //=================================================================================

    getHost() { return this._HOST; }
    _URLS = {
        _001_WEBSOCKET_NOTIFY: 'ws://' + this._HOST + '/notify',
        _011_CAPTCHA_GET_IMAGE: 'http://' + this._HOST + '/securety/get_captcha?sessionid=' + this._user.SessionId,

        _100_LOG_GPRS: '',
        _101_LOG_DEVICE: '',
        _102_LOG_SCREEN_FROM_TO: '',
        _103_LOG_SCREEN_VIEW_XY: '',
        _104_LOG_SCREEN_ACTION: '',

        _200_NOTIFY_GET_ALL: 'http://' + this._HOST + '/api/app_notify_realtime/post_Request',

        _300_USER_ENCRYPT_KEY: '',
        _303_USER_REQUEST_SMS_OTP: 'http://' + this._HOST + '/api/user/post_sendOtp', //?___decrypt=true 
        _301_USER_LOGIN: 'http://' + this._HOST + '/api/user_login/post_Request', //?___decrypt=true
        _302_USER_EXIST: 'http://' + this._HOST + '/api/user_login/post_Request', //?___decrypt=true 

        _310_USER_REQUEST_SMS_OTP: '',
        _311_USER_CREATE_PASS_FIRST: '',
        _312_USER_CHANGE_PASS: 'http://' + this._HOST + '/api/user_login/post_updateByAction?storeAction=userCreateNewPassword',

        _320_USER_GET_PROFILE: '',
        _321_USER_UPDATE_AVATAR: '',
        _322_USER_UPDATE_PROFILE: '',

        _500_PAWN_GET_HISTORY_TRANS: 'http://' + this._HOST + '/api/pawn_trans/post_Request',
        _501_PAWN_GET_LIST_CONTRACT: 'http://' + this._HOST + '/api/pawn_info/post_Request',
        _555_PAWN_CREATE_LOAN_FASTER: 'http://' + this._HOST + '/api/pawn_online/post_addNew',
        _556_PAWN_CREATE_LOAN_AGAIN: 'http://' + this._HOST + '/api/pawn_info_ext/post_AddNew_ext',
        _557_PAWN_CREATE_LOAN_FASTER_DKXM: 'http://' + this._HOST + '/api/pawn_loan_faster_info/post_Request',

        _600_CUS_NOTIFY: 'http://' + this._HOST + '/api/cus_notify/post_Request',

        _800_PAWN_ONLINE_LIST: 'http://' + this._HOST + '/api/pawn_online/post_Request',
        _900_CUSTOMER_GET_BY_ID: 'http://' + this._HOST + '/api/profile/post_Request'
    }

    //=================================================================================

    _NOTIFY_CONNECTED = false;
    _notify_timer_reConnect = null;

    //=================================================================================

    _events = [
        'on_PUSH',
        'on_LOADING',
        'on_NOTIFY_SHOW',
        'on_CUSTOMER_CHECK_PHONE',
        'on_USER_LOGIN_SUCCESS',
        'on_USER_LOGOUT',
        'on_HEADER_CHANGED',
        'on_SCREEN_INITED',
        'on_SCREEN_CHANGED',
        'on_ITEM_SELECTED',
        'on_SCREEN_SUBMIT',
        'on_SCREEN_CANCEL',
        'on_SNACKBAR_OPEN',
        'on_BIZ_LOAN_FASTER'
    ];

    //=================================================================================

    _SCREEN = {
        Home: 'Home',
        Login: 'Login',
        LoginByQRCode: 'LoginByQRCode'
    };
    _main = null;
    _viewCurrent = null;
    _viewPopup = null;
    _pushDataLastest = null;
    _pushResultLastest = null;

    //=================================================================================

    base_Init(main_) {
        this._main = main_;
        const viewName = this._viewName === null || this._viewName.length === 0 ? this._viewPopupName : this._viewName;
        this.view_Load(viewName);
        this.biz_Init();
    }

    base_freeResource() {
        if (this._notify_timer_reConnect) clearInterval(this._notify_timer_reConnect);
    }

    //=================================================================================

    //#region [ INDICATOR ]

    indicator_Show(isVisiable) {
        this._main.setState({ indicator: isVisiable });
    }

    //#endregion

    //#region [ NOTIFY ]

    _notify_Setup() {
        try {
            let uri = 'ws://' + this._HOST + '/notify?sessionid=' + this._user.SessionId;
            console.log('SOCKET = ' + uri);
            _push = new WebSocket(uri);
            _push.onopen = () => this._notify_onOpened();
            _push.onmessage = (data) => this._notify_onMessage(data.data);
            _push.onerror = (error) => this._notify_onDisconnected();
            _push.onclose = () => this._notify_onDisconnected();
        } catch (e) { }
    }

    _notify_onOpened() {
        console.log('SOCKET OPEN ...');
    }

    _notify_onMessage(data) {
        console.log('SOCKET MESSAGE: ', data);
    }

    _notify_onDisconnected() {
        console.log('SOCKET CLOSE ...');
    }

    //=================================================================================

    _notifyCounter = 0;
    _notifyArray = [];
    _notify_setArray(arr) {
        this._notifyArray = arr === null ? [] : arr;
        this._notifyCounter = this._notifyArray.length;
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! NOTIFY_ARRAY = ', this._notifyArray);
    }
    _notify_getTopFirst() {
        if (this._notifyCounter > 0) {
            return this._notifyArray[0];
        }
        return null;
    }
    _notify_getTop(size) {
        let a = [];
        const len = this._notifyCounter >= size ? size : this._notifyCounter;
        if (len > 0)
            for (let i = 0; i < len; i++) a[i] = this._notifyArray[i];
        return a;
    }
    _notify_getAll() { return this._notifyArray; }
    _notify_getLength() { return this._notifyCounter; }

    _notify_syncAll(_callbackSuccess) {
        const user_id = this._user.UserId;

        this.push('POST', this._URLS._200_NOTIFY_GET_ALL, '200',
            { Conditions: 'user_receiver = null || user_receiver.Length = 0 || user_receiver.Contains(\"' + user_id + ',\") || user_receiver.Contains(\",' + user_id + '\") ', pageSize: -1 },
            (res) => {
                console.log('???????????? _200_NOTIFY_GET_ALL === ', res);
                if (_callbackSuccess && typeof _callbackSuccess === 'function') _callbackSuccess();
            },
            () => {

            });
    }

    //#endregion

    //#region [ ENCRYPT ]

    encrypt(text, _pass) {
        var CryptoJS = require("crypto-js");

        //Creating the Vector Key
        var iv = CryptoJS.enc.Hex.parse('e84ad660c4721ae0e84ad660c4721ae0');
        //Encoding the Password in from UTF8 to byte array
        var Pass = CryptoJS.enc.Utf8.parse(_pass);
        //Encoding the Salt in from UTF8 to byte array
        var Salt = CryptoJS.enc.Utf8.parse("insight123resultxyz");
        //Creating the key in PBKDF2 format to be used during the decryption
        var key128Bits1000Iterations = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, { keySize: 128 / 32, iterations: 1000 });

        var encrypted = CryptoJS.AES.encrypt(text, key128Bits1000Iterations, { mode: CryptoJS.mode.CBC, iv: iv, padding: CryptoJS.pad.Pkcs7 });
        var sEncrypted = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

        //var sEncrypted = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
        //var decrypted2 = CryptoJS.AES.decrypt(sEncrypted, key128Bits1000Iterations, { mode: CryptoJS.mode.CBC, iv: iv, padding: CryptoJS.pad.Pkcs7 });

        return sEncrypted;
    }

    encrypt_Base64(text) {
        //////var CryptoJS = require("crypto-js");

        ////////Creating the Vector Key
        //////var iv = CryptoJS.enc.Hex.parse('e84ad660c4721ae0e84ad660c4721ae0');
        ////////Encoding the Password in from UTF8 to byte array
        //////var Pass = CryptoJS.enc.Utf8.parse(_pass);
        ////////Encoding the Salt in from UTF8 to byte array
        //////var Salt = CryptoJS.enc.Utf8.parse("insight123resultxyz");
        ////////Creating the key in PBKDF2 format to be used during the decryption
        //////var key128Bits1000Iterations = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, { keySize: 128 / 32, iterations: 1000 });

        //////var encrypted = CryptoJS.AES.encrypt(text, key128Bits1000Iterations, { mode: CryptoJS.mode.CBC, iv: iv, padding: CryptoJS.pad.Pkcs7 });
        //////var sEncrypted = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);

        ////////var sEncrypted = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
        ////////var decrypted2 = CryptoJS.AES.decrypt(sEncrypted, key128Bits1000Iterations, { mode: CryptoJS.mode.CBC, iv: iv, padding: CryptoJS.pad.Pkcs7 });

        //////return sEncrypted;

        var base64 = require('base-64');
        var utf8 = require('utf8');

        var uri_data = encodeURIComponent(text);

        console.log('ENCRYPT_BASE64 text = ', text);
        console.log('ENCRYPT_BASE64 uri encode = ', uri_data);

        //var text = 'foo © bar 𝌆 baz';
        var bytes = utf8.encode(uri_data);
        var sEncrypted = base64.encode(bytes);
        return sEncrypted;
    }

    decrypt(encryptData, _pass) {
        try {
            //var _pass = global._user.EncryptKey;

            var CryptoJS = require("crypto-js");
            //var encryptData = 'e7B3Orc715U7B+rmk8TPfEM5lsWk0yzL7/PxVv/lFMOms5Az88rxfJ8kvuKNe9n40x7F5ukj3bpkH7p+j44MJo3/j5Xjpz5Bi1QBF2qEb1rkev/cQFUoKH/+RZFu1aePzYuaD2mR+dS48dlA8Fdh6f9dUR2nQHBemLZ5s/z0a2MbivOibYKGFDQJ4TPra/W6sMnvYYu56RCbS2f7D80nibvHIPtByUNINGuQrXHCxEB2W3e4cepAsMNapXnC/LI6UWvCSNorfJBiC46Tbi0DnmaI7YAFRL3FRlc69Nr9d5NYcDnRgBZFsvSE2+m7WlIUPWj7FaaXM905i4zER5jgzrWdzl98EdDwbP7wwjgDSJPnH7IR/tzSFII7STf+pa0ZRAfwpQSqwCZwoU+i0u0TRz/j0Ki+1+7cVfVmzsHnxM76rRR1MEMUz2HjehLWaDHKblNM/gfbp3z+zxhTb88W3EJTOaTbquKwHMGwkz+Bpzhm+BUjCgBm62ffX8HGq0DKtJ9nMEXlNUEmTZPF6smy1IX26adU46/gpd1YMiHvebQ=';

            //Creating the Vector Key
            var iv = CryptoJS.enc.Hex.parse('e84ad660c4721ae0e84ad660c4721ae0');
            //Encoding the Password in from UTF8 to byte array
            var Pass = CryptoJS.enc.Utf8.parse(_pass);
            //Encoding the Salt in from UTF8 to byte array
            var Salt = CryptoJS.enc.Utf8.parse("insight123resultxyz");
            //Creating the key in PBKDF2 format to be used during the decryption
            var key128Bits1000Iterations = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, { keySize: 128 / 32, iterations: 1000 });

            //Enclosing the test to be decrypted in a CipherParams object as supported by the CryptoJS libarary
            var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(encryptData)
            });

            //Decrypting the string contained in cipherParams using the PBKDF2 key
            //var decrypted = CryptoJS.AES.decrypt(cipherParams, `enter code here`key128Bits1000Iterations, { mode: CryptoJS.mode.CBC, iv: iv, padding: CryptoJS.pad.Pkcs7 });
            var decrypted = CryptoJS.AES.decrypt(cipherParams, key128Bits1000Iterations, { mode: CryptoJS.mode.CBC, iv: iv, padding: CryptoJS.pad.Pkcs7 });
            var text_decode = decrypted.toString(CryptoJS.enc.Utf8);

            //console.log('decrypted: ' + text_decode);
            return text_decode;
        }
        catch (e) {
            console.log('DECRYPT -> ERROR: ', encryptData);
        }

        return '';
    }

    //#endregion

    //#region [ PUSH ]

    push_getDataLastest() { return this._pushDataLastest; }
    push_getResultLastest() { return this._pushResultLastest; }

    push(method, url, pushcode, data, _callbackSuccess, _callbackFail) {
        const _self = this;

        console.log('API.PUSH === ', url, method, pushcode, data);

        if (url === null || url === undefined) {
            if (_callbackFail) _callbackFail({ Ok: false, Code: -2, Message: 'url is null' });
            return;
        }

        if (method === null || method === undefined) {
            if (_callbackFail) _callbackFail({ Ok: false, Code: -2, Message: 'method is null' });
            return;
        }

        if (pushcode === null || pushcode === undefined) {
            if (_callbackFail) _callbackFail({ Ok: false, Code: -2, Message: 'pushcode is null' });
            return;
        }

        const _encryptKey = this._user.EncryptKey;
        let _body;
        if (data) {
            this._pushDataLastest = data;

            let json = JSON.stringify(data);
            let encrypt = this.encrypt_Base64(json);

            _body = pushcode + json;
            if (this._is_encrypt_data) _body = pushcode + encrypt;

            console.log('API.PUSH -> url = ', url);
            console.log('API.PUSH -> pushcode = ', pushcode);
            console.log('API.PUSH -> EncryptKey = ', _encryptKey);
            console.log('API.PUSH -> _pushData = ', json);
            console.log('API.PUSH -> encrypt = ', encrypt);
            console.log('API.PUSH -> _body = ', _body);
        }

        fetch(url, {
            method: method,
            headers: {
                //'Content-Type': 'application/json',
                //'Accept': 'application/json',
                'Content-Type': 'text/plain; charset=utf-8',
                'Accept': 'text/plain; charset=utf-8',
                'sessionid': this._user.SessionId,
                'encryptkey': _encryptKey,
                'pushcode': pushcode
            },
            body: _body
        }).then(res => res.text()).then(text => {
            console.log('API.PUSH -> RESPONSE ??????? = ' + (text.length > 50 ? text.substr(0, 50) : text));
            //_f_push_callback(_encryptKey, text); 
            //console.log('PUSH_CALLBACK text = ', text);

            if (text.length > 3) {
                const res_puscode = text.substring(0, 3);
                let encryptData = text.substring(3, text.length);
                let decryptData = encryptData;
                if (this._is_encrypt_data) decryptData = this.decrypt(encryptData, _encryptKey);

                //console.log('API.PUSH -> CALLBACK encryptData = ', encryptData);
                //console.log('API.PUSH -> CALLBACK decryptData = ', decryptData);

                var obj = { Ok: true, Code: -1, Message: 'Có lỗi xảy ra khi đọc dữ liệu từ server. Vui lòng truy cập lại' };
                try {
                    obj = JSON.parse(decryptData);
                    this._pushResultLastest = obj;
                    console.log('API.PUSH -> RESPONSE -> CALLBACK: object = ', obj);
                } catch (e) {
                    obj.Ok = false;
                    obj.Message = 'Dữ liệu trả về không hợp lệ. Vui lòng truy cập lại';
                }

                if (obj.Ok && _callbackSuccess && typeof _callbackSuccess === 'function')
                    _callbackSuccess(obj);

                if (obj.Ok === false && _callbackFail && typeof _callbackFail === 'function')
                    _callbackFail(obj);

            } else {
                if (_callbackFail && typeof _callbackFail === 'function') {
                    _callbackFail({ Ok: false, Code: -1, Message: 'Dữ liệu trả về không chứa [pushcode]' });
                }
            }
        });
    }

    //#endregion

    //#region [ ALERT ]

    alert(title, content) {
        //console.log('API.alert ===', title, content);
        if (content === undefined && title && title.length > 0) {
            Alert.alert('Thông báo', title);
            return;
        }

        if (content && content.length > 0) {
            if (title && title.length > 0) {
                Alert.alert(title, content);
            } else {
                Alert.alert('Thông báo', content);
            }
        }
    }

    //#endregion

    //#region [ PHONE ]

    phone_getValidMessage(phone) {

        //let phone = this.state.phone;
        if (phone === '0123456789' || phone === '0123456788') return '';

        if (phone.length == 0 || phone.length != 10) {
            return 'Vui lòng nhập chính xác số điện thoại';
        }

        let onlyNumber09 = phone
            .split('0').join('')
            .split('1').join('')
            .split('2').join('')
            .split('3').join('')
            .split('4').join('')
            .split('5').join('')
            .split('6').join('')
            .split('7').join('')
            .split('8').join('')
            .split('9').join('').length === 0;
        if (onlyNumber09 == false) {
            return 'Vui lòng nhập chính xác số điện thoại';
        }

        if (
            //viettel
            phone.indexOf('086') === 0 ||
            phone.indexOf('096') === 0 ||
            phone.indexOf('097') === 0 ||
            phone.indexOf('098') === 0 ||
            phone.indexOf('032') === 0 ||
            phone.indexOf('033') === 0 ||
            phone.indexOf('034') === 0 ||
            phone.indexOf('035') === 0 ||
            phone.indexOf('036') === 0 ||
            phone.indexOf('037') === 0 ||
            phone.indexOf('038') === 0 ||
            phone.indexOf('039') === 0 ||

            //mobifone
            phone.indexOf('089') === 0 ||
            phone.indexOf('090') === 0 ||
            phone.indexOf('093') === 0 ||
            phone.indexOf('070') === 0 ||
            phone.indexOf('079') === 0 ||
            phone.indexOf('077') === 0 ||
            phone.indexOf('076') === 0 ||
            phone.indexOf('078') === 0 ||

            //vinaphone
            phone.indexOf('088') === 0 ||
            phone.indexOf('091') === 0 ||
            phone.indexOf('094') === 0 ||
            phone.indexOf('083') === 0 ||
            phone.indexOf('084') === 0 ||
            phone.indexOf('085') === 0 ||
            phone.indexOf('081') === 0 ||
            phone.indexOf('082') === 0 ||

            //vietnamobile
            phone.indexOf('092') === 0 ||
            phone.indexOf('056') === 0 ||
            phone.indexOf('058') === 0 ||

            //Gmobile 
            phone.indexOf('099') === 0 ||
            phone.indexOf('059') === 0) {
            return '';
        } else {
            return 'Vui lòng nhập chính xác số điện thoại';
        }
    }

    //#endregion

    //#region [ USER ]

    user_isLogined = () => { return this._user.Active; }
    user_isLoanFaster = () => { return this._user.IsLoanFaster; }
    user_getId = () => { return this._user.UserId; }
    user_getPhone = () => { return this._user.Phone; }
    user_getObject = () => { return this._user; }
    user_onQrCodeCallback = (data) => {
        console.log('API.QR_CODE ===== ', data);

        this.view_Load('-1');

        let msg = this.phone_getValidMessage(data);
        if (msg.length > 0) {
            this.alert('Vui lòng quét đúng số điện thoại');
            return;
        }

        this._user.isQRCode = true;
        this._user.Username = data;
        this._user.Phone = data;

        EventRegister.emit('EVENT_DATA_CHANGED', this._user);
    };
    user_Logout = () => {
        this._items_setArray([]);

        this._user.Active = false;
        this._user.isQRCode = false;
        this._user.ShowNPS = false;
        this._user.IsLoanFaster = false;

        this.view_Load('-1');
        this.view_Load('Login');
    };



    user_goScreen_loginByQRCode() {
        this.view_Load(this._SCREEN.LoginByQRCode);
    }

    user_goScreen_forgotPassword() {
        //this.view_Load(this._SCREEN.LoginByQRCode);
    }

    user_goScreen_sendSmsOTP() {
        //this.view_Load(this._SCREEN.LoginByQRCode);
    }

    user_login_setStateChecking(stateLogining) {
        this._user.IsLogining = stateLogining;
    }

    user_getSessionId() {
        return this._user.SessionId;
    }

    user_getAvatar() {
        let img = this._user.Avatar;
        //if (img === null) img = require('@assets/v201/icons/ic_avatar.png');
        return img;
    }

    user_getCustomerId() {
        return this._user.CustomerId;
    }

    user_getUsername() {
        return this._user.Username;
    }

    user_getFullname() {
        return this._user.Fullname;
    }

    user_Login(username, password, _callbackSuccess, _callbackFail) {
        const _self = this;

        if (this._user.IsLogining) {
            console.log('API.login checking === ', username, password);
            if (_callbackFail && typeof _callbackFail === 'function') _callbackFail();
            return;
        }

        _self.user_login_setStateChecking(true);
        if (this.___phone_test) username = this.___phone_test;
        if (this.___password_test) password = this.___password_test;
        console.log('API.login[1] === ', username, password);

        if (username.length === 0) {
            this.alert('Vui lòng nhập số điện thoại');
            _self.user_login_setStateChecking(false);
            if (_callbackFail && typeof _callbackFail === 'function') _callbackFail();
            return;
        }

        let msg = this.phone_getValidMessage(username);
        if (msg.length > 0) {
            this.alert(msg);
            _self.user_login_setStateChecking(false);
            if (_callbackFail && typeof _callbackFail === 'function') _callbackFail();
            return;
        }

        if (password.length === 0) {
            this.alert('Vui lòng nhập mật khẩu');
            _self.user_login_setStateChecking(false);
            if (_callbackFail && typeof _callbackFail === 'function') _callbackFail();
            return;
        }

        _self._user.Active = false;
        _self._user.CustomerId = 0;
        _self._user.Fullname = username;
        _self._user.Username = username;
        _self._user.Phone = username;

        this.push('POST', this._URLS._500_PAWN_GET_HISTORY_TRANS, '500',
            { Conditions: 'phone = "' + username + '" ', pageSize: -1 },
            (res) => {
                //[1] check pawn trans success
                //_self._user.IsLogining = false;
                //_self.alert('continous login ...');

                _self.pawn_syncCollection(res);

                _self.push('POST', _self._URLS._301_USER_LOGIN, '301',
                    { Conditions: ' user_name = "' + username + '" and password = "' + password + '" ' },
                    (res2) => {
                        //Login success                        
                        _self.user_login_setStateChecking(false);
                        //_self.alert('continous login ...');
                        console.log('_USER_LOGIN = ', res2);

                        if (res2 && res2.Ok && res2.ResultItems && res2.ResultItems.length > 0) {
                            let o = res2.ResultItems[0];
                            _self._user.Active = true;
                            _self._user.UserId = o.user_id;
                            //_self._user.Avatar= require('@assets/v201/icons/ic_avatar.png')

                            if (_self._itemsCounter > 0) {
                                const _u = _self._items_getAll()[0];
                                _self._user.IsNew = false;
                                _self._user.CustomerId = _u.customer_id;
                                _self._user.Fullname = _u.customer_name;
                            }

                            _self._notify_syncAll(() => {
                                _self.view_Load(_self._SCREEN.Home);
                            });
                        } else {
                            if (res2.Message && res2.Message.length > 0) {
                                _self.alert(res2.Message);
                            } else {
                                _self.alert('Vui lòng nhập chính xác tài khoản');
                            }
                            if (_callbackFail && typeof _callbackFail === 'function') _callbackFail();
                        }

                    }, (err2) => {
                        _self.user_login_setStateChecking(false);
                        _self.alert('Hệ thống đang có lỗi. Vui lòng quy lại sau.');
                        if (_callbackFail && typeof _callbackFail === 'function') _callbackFail();
                    });

            }, (err) => {
                //[0] check pawn trans fail
                _self.user_login_setStateChecking(false);
                _self.alert('Hệ thống đang có lỗi. Vui lòng quy lại sau.');
                if (_callbackFail && typeof _callbackFail === 'function') _callbackFail();
            });
    }
    
    user_Logout() {
        this._viewPopup = null;
        this._viewPopupName = null;

        this._user.Active = false;
        this._user.CustomerId = 0;
        this._user.Fullname = '';
        this._user.Username = '';
        this._user.Phone = '';

        this.view_Load('Login');
    }

    user_loginSuccess = (user) => {
        const _self = this;

        _self._user.Active = true;
        if (user.customer_id) _self._user.CustomerId = user.customer_id;
        if (user.customer_name) _self._user.Fullname = user.customer_name;
        if (user.user_name)_self._user.Username = user.user_name;
        if (user.user_name) _self._user.Phone = user.user_name;
        if (user.show_nps && user.show_nps === 1) _self._user.ShowNPS = true;
        if (user.is_loan_faster && user.is_loan_faster === 1) _self._user.IsLoanFaster = true;

        console.log('USER_LOGIN_SUCCESS = ', JSON.stringify(user));
    };

    //#endregion

    //#region [ EVENT ]

    event_getArrayString() {
        return this._events;
    }

    //#endregion

    //#region [ VIEW ]

    view_getCurrent() {
        return this._viewCurrent;
    }

    view_getPopup() {
        return this._viewPopup;
    }

    view_Load(viewName) {
        if (viewName === null || viewName === undefined) return;
        console.log('SCREEN -> GO: ', viewName);
        const _self = this;

        switch (viewName) {
            case "-1": //close popup
                _self._viewPopup = null;
                _self._viewPopupName = '';
                _self._main.setState({ viewPopup: _self._viewPopup });
                break;
            case 'Home':
            case 'Notify':
            case 'NotifyDetail':
            case 'Login':
            case 'LoanFaster':
            case 'PawnList':
            case 'PawnDetail':
                _self._viewPopup = null;
                if (_self._viewPopupName && _self._viewPopupName.length > 0) _self._viewPopup = _self._views[_self._viewPopupName];

                _self._viewName = viewName;
                _self._viewCurrent = _self._views[viewName];
                _self._main.setState({ viewCurrent: _self._viewCurrent, viewPopup: _self._viewPopup });
                break;
            case 'ScanQr':
            case 'MapUser':
            case 'ChangePass':
            case 'ForgetPassRequestSmsOTP':
            case 'ForgetPassCheckOTP':
            case 'ForgetPassSubmit':
            case 'CustomerNPS':
            case 'LoanFasterMessage':
            case 'SmsOtp':
            case 'UserProfile':
                if (_self._viewCurrent === null && _self._viewName && _self._viewName.length > 0) _self._viewCurrent = _self._views[_self._viewName];

                _self._viewPopupName = viewName;
                _self._viewPopup = _self._views[viewName];
                _self._main.setState({ viewCurrent: _self._viewCurrent, viewPopup: _self._viewPopup });
                break;
        }

    }

    //#endregion

    //#region [ TAB ]

    _tabIndex = 0;
    tab_Go(index) {
        //if (index === 'Home') {
        //    this._tabIndex = 0;
        //    this._main._go_tab({ name: 'Home' }, 0);
        //    return;
        //}

        if (this._tabIndex != index) {
            let tab = { name: '' };
            switch (index) {
                case 0:
                    tab = { name: 'Home' };
                    break;
                case 1:
                    tab = { name: 'LoanFaster'};
                    break;
                case 2:
                    tab = { name: 'PawnList'};
                    break;
                case 3:
                    break;
            }
            console.log('API.tab_Go === ', index, tab);
            if (this._user.Active && tab.name.length > 0 && this._main) {
                this._tabIndex = index;
                this._main._go_tab(tab, index);
            }
        }
    }

    //#endregion

    //=================================================================================

    //#region [ ITEMS ]

    _itemsCounter = 0;
    _itemsArray = [];
    _items_setArray(arr) {
        this._itemsArray = arr === null ? [] : arr;
        this._itemsCounter = this._itemsArray.length;
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ITEMS_ARRAY = ', this._itemsArray);
    }
    _items_getTopFirst() {
        if (this._itemsCounter > 0) {
            return this._itemsArray[0];
        }
        return null;
    }
    _items_getTop(size) {
        let a = [];
        const len = this._itemsCounter >= size ? size : this._itemsCounter;
        if (len > 0)
            for (let i = 0; i < len; i++) a[i] = this._itemsArray[i];
        return a;
    }
    _items_getAll() { return this._itemsArray; }
    _items_getLength() { return this._itemsCounter; }

    //#endregion

    //=================================================================================

    biz_Init() {
        this.pawn_loanFaster_syncInfoDKXM();
    }

    //#region [ PAWN ]

    _pawnItemSelected = null;

    pawn_setSelected(item) {
        this._pawnItemSelected = item;
    }

    pawn_getSelected() {
        return this._pawnItemSelected;
    }

    pawn_syncCollection(result, _callbackSuccess) {
        let _arr = [];
        if (result && result.Ok && result.ResultItems && result.ResultItems.length > 0) {

            let results = _.filter(result.ResultItems, function (o) {
                return o.transaction_date != null && o.transaction_date.length > 0 && o.action != null && o.action.length > 0;
            });

            results = _.reduce(results, function (arr, o) {
                var a = o.transaction_date.split('-');
                o.date_trans = parseInt(a[2] + a[1] + a[0]);
                o.status_title = o.action.split('-')[0].trim();
                arr.push(o);
                return arr;
            }, []);

            console.log('????????????????????????_500_PAWN_GET_HISTORY_TRANS results = ', results);

            //results = _.orderBy(results, 'date_trans', 'desc');
            results = _.orderBy(results, 'id', 'desc');

            let group_by = _.chain(results).groupBy('pawn_code').map(function (v, i) {

                return {
                    pawn_code: i,
                    pawn_id_ref: _.get(_.find(v, function (o1) { return o1.action_id === 1; }), 'pawn_id'),
                    pawn_create_date: _.get(_.find(v, function (o1) { return o1.action_id === 1; }), 'transaction_date'),
                    pawn_create_date_int: _.get(_.find(v, function (o1) { return o1.action_id === 1; }), 'date_trans'),
                    loan_money_init: _.get(_.find(v, function (o1) { return o1.action_id === 1; }), 'transaction_money'),
                    //age: _.get(_.find(v, 'age'), 'age'),
                    //pet: _.map(v, 'pet')
                    items: v
                };
            }).value();
            ////console.log('_500_PAWN_GET_HISTORY_TRANS group_by = ', group_by);

            group_by.map((_group, i1) => {
                //console.log(_group.pawn_code, _group.items.length);
                _group.items.map((item, i2) => {
                    //console.log('-----' + item.pawn_code, item.transaction_money);
                    item.pawn_id_ref = _group.pawn_id_ref;
                    item.loan_money_init = _group.loan_money_init;
                    item.pawn_create_date = _group.pawn_create_date;
                    item.pawn_create_date_int = _group.pawn_create_date_int;
                    item.category_code = item.category_code.substr(0, 8);
                    _arr.push(item);
                });
            });

            this._items_setArray(_arr);
        }

        if (_callbackSuccess && typeof _callbackSuccess === 'function')
            _callbackSuccess(_arr);
    }

    pawn_loanFasterSubmit(_pawnNew, _callbackSuccess, _callbackFail) {
        //pawn_id: _def_pawn_id,
        //loan_money: _def_loan_money,
        //loan_month: _def_loan_month,
        //category_code: _def_category_code,
        //asset_name: _def_asset_name

        //00000015        	Đăng ký Ô tô
        //00000017        	Đăng ký xe máy
        //00000019        	Đồ gia dụng

        //if (this._items_getLength() > 0) {
        if (_pawnNew.pawn_id > 0) {
            //vay lai 

            const money = _pawnNew.loan_money;
            let month = _pawnNew.loan_month;

            if (isNaN(money)) {
                this.alert('Chọn số tiền vay');
                return;
            }

            if (isNaN(month)) {
                this.alert('Chọn thời hạn vay');
                return;
            }

            month = parseInt(month);

            //let pa = this._items_getTopFirst();
            let data = { refer_pawn_id: _pawnNew.pawn_id, sum_loan_date: month, money_total: money };

            //console.log('_556_PAWN_CREATE_LOAN_AGAIN = ', this.state);
            console.log('_556_PAWN_CREATE_LOAN_AGAIN data = ', data);


            //EventRegister.emit('on_LOADING', { visible: true });
            this.push('POST', this._URLS._556_PAWN_CREATE_LOAN_AGAIN, '556', data, _callbackSuccess, _callbackFail);
        } else {
            //vay tien nhanh

            //if (typeAsset == 'Chọn loại tài sản') {
            //    this.alert('Chọn loại tài sản');
            //    return;
            //}

            var data =
            {
                customer_id: this._user.CustomerId,
                asset: this._loanFasterInfoDKXM.category_name,
                money: this._loanFasterInfoDKXM.loan_money,
                days: parseInt(this._loanFasterInfoDKXM.loan_day_total)
            };

            //console.log('_555_PAWN_CREATE_LOAN_FASTER = ', this.state);
            console.log('_555_PAWN_CREATE_LOAN_FASTER data = ', data);

            //EventRegister.emit('on_LOADING', { visible: true });

            this.push('POST', this._URLS._555_PAWN_CREATE_LOAN_FASTER, '555', data, _callbackSuccess, _callbackFail);
        }
    }

    // [ DKXM ]

    _loanFasterInfoDKXM = {
        id: 1,
        loan_money: 2000000,
        date_create: 20190808150000,
        loan_day_total: 12,
        state: 1,
        category_code: "00000017",
        category_name: "Đăng ký xe máy"
    };

    pawn_loanFaster_getInfoDKXM() { return this._loanFasterInfoDKXM; }

    pawn_loanFaster_syncInfoDKXM(_callbackSuccess, _callbackFail) {
        this.push('POST', this._URLS._557_PAWN_CREATE_LOAN_FASTER_DKXM, '557', { Conditions: ' state = 1 ' }, (res) => {

            console.log('DKXM_INFO === ', res);

            if (res && res.Ok && res.ResultItems && res.ResultItems.length > 0) {
                this._loanFasterInfoDKXM = res.ResultItems[0];
            }

            if (_callbackSuccess && typeof _callbackSuccess === 'function') {
                _callbackSuccess(res);
            }
        }, () => {
            if (_callbackFail && typeof _callbackFail === 'function') {
                _callbackFail();
            }
        });
    }

    //#endregion

    //---------------------------------------------------------------------------------
    //end class _API
}