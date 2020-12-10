
export default class FileSystemManager{
  constructor() {
    
  }
  success(wx_object) {
    const wx_path = wx_object.path
    const wx_success = wx_object.success
    const wx_fail = wx_object.fail
    const wx_complete = wx_object.wx_complete
   if(wx_path){
     if(wx_success){
       wx_success()
     }
     if(wx_complete){
       wx_complete()
     }
   }else {
     const errMsg = `fail no such fail or directory ${wx_path}`
     if(wx_fail){
       wx_fail(errMsg)
     }
     if(wx_complete) {
       wx_complete(errMsg)
     }
   }

  }
}
