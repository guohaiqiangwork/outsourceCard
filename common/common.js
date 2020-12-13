export default {
    memberObj:{
        // hostUrl:'http://192.168.0.101',
		hostUrl:'https://www.hcselected.com/service',
		
    },
    setMemberObj(data){
        this.memberObj = Object.assign({},this.memberObj,data) 
    }
}