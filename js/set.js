var i=0;
var times=0;//生成树的次数
var n=0,m=0;//家族树数
var treeNum=[];//导师节点数组
var intarea;//文本域内容
var Arr;//按行分割
var Arr2;//学生名按顿号分割
var Arr3=[];//技能信息存储
var studentnum = 0 ;//技能信息行数
var data;
var ssnodes;
var searchObj;
var isgrade; //判断本行是否是技能信息
var before,behind;//xxxx级xx；学生
var zNodes=[{menuName:"导师" ,open:true}];
var zzNodes=[{menuName:"0" ,open:true}];
var searnodes=[{menuName:"0" ,open:true}];
zNodes[0].isParent=true;

var setting = {
    data: {
        simpleData: { //简单数据模式
            enable: true, //true 、 false 分别表示 使用 、 不使用 简单数据模式
            idKey: "id", //节点数据中保存唯一标识的属性名称
            pIdKey: "parentId", //节点数据中保存其父节点唯一标识的属性名称  
            rootPId: 0 //用于修正根节点父节点数据，即 pIdKey 指定的属性值
        },
        key: {
            name: "menuName" //zTree 节点数据保存节点名称的属性名称  默认值："name"
        }
    },
    view: {
        dblClickExpand: true, //双击节点时，是否自动展开父节点的标识
        showLine: true, //是否显示节点之间的连线
        fontCss: { 'color': 'black', 'font-weight': 'bold' }, //字体样式函数
        selectedMulti: true //设置是否允许同时选中多个节点
    },
    edit: {
        enable: true,
        editNameSelectAll: true,
        showRemoveBtn: true,
        showRenameBtn: true,
        removeTitle: "remove",
        renameTitle: "rename"
    },
    check: {
        enable: false, //true 、 false 分别表示 显示 、不显示 复选框或单选框
        nocheckInherit: true //当父节点设置 nocheck = true 时，设置子节点是否自动继承 nocheck = true 
    },
};

function find(){
    var flag=0;
    var f=false;
    for(var a=0;a<n;a++){
        searchObj=$.fn.zTree.getZTreeObj("regionZTree"+a);
        searchObj.cancelSelectedNode();//取消上一次查找所选的节点
    }
    data=$("#stxt").val();
    var studentskills;
    for(var j = 0; j < studentnum ; j++) //根据输入的名字，查找他的技能字符串
    {
        var studentname;
        var k = Arr3[j].indexOf("：");
        var studentname=Arr3[j].substring(0,k);
        if (studentname == data){
            studentskills = Arr3[j].substring(k+1,Arr3[j].length);
            break;
        }
    }
    for(var a=0;a<n;a++){//遍历n棵树
        searchObj=$.fn.zTree.getZTreeObj("regionZTree"+a);
        searnodes=searchObj.getNodesByParam("menuName",data,null);//根据名字查找到的节点searnodes[0]
        searchObj.selectNode(searnodes[0]);//名字符合的节点设为选中状态
        ssnodes=searchObj.getSelectedNodes();//被选中的节点ssnodes[0]
        if(ssnodes.length>0){//有选中的节点
            flag++;
            f=true;
            if(flag==1){//只输出一次导师
                searchObj.selectNode(ssnodes[0]);
                ssnodes=searchObj.getNodes();//ssnodes更新为整棵树的节点
                //var searchboss = console.log( ssnodes[0].menuName , searchboss);
                console.log(studentskills)
                $("#result").text(ssnodes[0].menuName+"\n\n"+studentskills);//ssnodes[0]此时为根节点
            }
        }
        if(!f)
            $("#result").text("NONE");//没有选中的节点
    }
}

function toLine(){
        intarea=$("#texts").val();
        Arr=intarea.split(/[(\r\n)\r\n]+/);
      //  Arr=intarea.split("\r\n");
}

function teacherNum(){
        for(var t=0;t<Arr.length;t++){
            var temp = new String(Arr[t]);
            if(temp.includes("导师")){
                treeNum[n]=t;
                n++;
            }
        }
        treeNum[n]=Arr.length;
}

function moveplace(){
    if(n==1){
        $("#treediv1").removeClass("treed");
        $("#treediv1").addClass("onetree");
    }
    else if(n==2){
        $("#treediv1").removeClass("treed");
        $("#treediv1").addClass("twotree");
        $("#treediv2").removeClass("treed");
        $("#treediv2").addClass("twotree");
    }
    else if(n==3){
        $("#treediv1").removeClass("treed");
        $("#treediv1").addClass("threetree");
        $("#treediv2").removeClass("treed");
        $("#treediv2").addClass("threetree");
        $("#treediv3").removeClass("treed");
        $("#treediv3").addClass("threetree");
    }
}

function getSname(x){
        var ss=new String(x);
        var k=ss.indexOf("：");
        isgrade = ss.substring(4,k);
        before=ss.substring(0,k);
        behind=ss.substring(k+1,ss.length);
        Arr2=behind.split("、");//学生名字
        Arr3[studentnum]=ss;
        studentnum ++;
}


function secondLayer(first,last){
    for(var ii=first+1;ii<last;ii++){
        getSname(Arr[ii]);//提取学生名进Arr2
        zNodes=zTreeObj.getNodes();
        zTreeObj.selectNode(zNodes[0]);
        var parentZNode=zTreeObj.getSelectedNodes(); 
        if(  isgrade == "级博士生" || isgrade == "级硕士生" || isgrade == "级本科生" ) //如果本行不是技能信息，则正常处理
        {
            zTreeObj.addNodes(parentZNode[0], [{menuName:before}], true);
            zTreeObj.expandAll(true);
        } 
    }
    zzNodes=zTreeObj.getNodes()[0].children;
}

function thirdLayer(first,last){
    var iii=0;
    for(var ii=first+1;ii<last;ii++){//二级数
        getSname(Arr[ii]);//提取学生名进Arr2
        zTreeObj.selectNode(zzNodes[iii]);
        var parentZNode = zTreeObj.getSelectedNodes();
        for(var jj=0;jj<Arr2.length;jj++)
            if ( isgrade == "级博士生" || isgrade == "级硕士生" || isgrade == "级本科生" ){
                zTreeObj.addNodes(parentZNode[0], [{menuName:Arr2[jj]}], true);
            }
        zTreeObj.expandAll(true); 
        iii++;
    }
}


