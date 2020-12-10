 import Vue from 'vue'
 export default class SocketTask {
   constructor(socket) {
     this.socket = socket 
      Vue.prototype._socket = socket
     this.socket.addEventListener("open", (vue_header,vue_profile) => {
       if (this.onOpen) {
         const wx_header = vue_header
         const wx_profile = vue_profile
         this.onOpen(wx_header,wx_profile);
       }
     })
     this.socket.addEventListener("close", (vue_code,vue_reson) => {
       if (this.onClose) {
         const wx_code = vue_code 
         const wx_reson = vue_reson
         Vue.prototype._socket_closeCode = wx_code
         Vue.prototype._socket_coloseReson = wx_reson
         this.onClose(wx_code,wx_reson);
       }
     })
     this.socket.addEventListener("error", (vue_errMsg) => {
       if (this.onError) {
         const wx_errMsg = vue_errMsg
         this.onError(wx_errMsg);
       }
     })
     this.socket.addEventListener("message", (vue_res) => {
       if (this.onMessage) {
         const wx_res = { data: vue_res.data }
         this.onMessage(wx_res);
       }
     })
   }
   send(wx_object) {
     let wx_data = wx_object.data
     let wx_success = wx_object.success
     let wx_fail = wx_object.fail
     let wx_complete = wx_object.complete
     wx_object = null;
     let vue_complete = wx_complete
     try {
       const vue_data = wx_data
       const vue_success = wx_success

       this.socket.send(vue_data)
       if (vue_success) {
         vue_success()
       }
       if (vue_complete) {
         vue_complete()
       }
     } catch {
       const vue_fail = wx_fail
       if (vue_fail) {
         vue_fail()
       }
       if (vue_complete) {
         vue_complete()
       }
     }


   }

   close(wx_object) {
     const wx_code = wx_object.code || 1000
     const wx_reson = wx_object.reson
     const wx_success = wx_object.success
     const wx_fail = wx_object.fail
     const wx_complete = wx_object.complete
     wx_object = null
     let vue_complete = wx_complete
     try {
       const vue_code = wx_code
       const vue_reson = wx_reson
       const vue_success = wx_success
       this.socket.close(vue_code, vue_reson);
       if(vue_success) {
         vue_success()
       }
       if(vue_complete) {
         vue_complete()
       }
     } catch {
        const vue_fail = wx_fail
        if(vue_fail) {
          vue_fail()
        }
        if(vue_complete) {
          vue_complete()
        }
     }

   }

   onOpen(callback) {
     this.onOpen = callback
   }
   onClose(callback) {
     this.onClose = callback

   }
   onError(callback) {
     this.onError = callback
   }

   onMessage(callback) {
     this.onMessage = callback

   }
 }