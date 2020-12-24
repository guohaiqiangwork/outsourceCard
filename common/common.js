export default {
    memberObj:{
		hostUrl:'https://www.hcselected.com/service',
		
    },
    setMemberObj(data){
        this.memberObj = Object.assign({},this.memberObj,data) 
    }
}