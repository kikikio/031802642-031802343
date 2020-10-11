var i=0;
var times=0;//生成树的次数
var n=0,m=0;//家族树数
var treeNum=[];//导师节点数组
var intarea;//文本域内容
var Arr;//按行分割
var Arr2;//学生名按顿号分割
var Arr3;//技能信息存储
var skillnum = 0 ;//技能信息行数
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

// function addZTreeNode(obj) {
//     var newNode = obj;

//     var treeObj = $.fn.zTree.getZTreeObj("regionZTree");
//     var parentZNode = treeObj.getSelectedNodes(); //获取父节点
//     newNode.nodeFlg = 1; // 可以自定义节点标识
//     newNode = treeObj.addNodes(parentZNode[0], newNode, true);
// }
// function editZTreeNode(obj) {

//     var zTree = $.fn.zTree.getzTreeObj("regionZTree");
//     var zTree = $.fn.zTree.getZTreeObj("regionZTree");
//     var nodes = zTree.getSelectedNodes();
//     for (var i = 0; i < nodes.length; i++) {
//         nodes[i].name = obj;
//         zTree.updateNode(nodes[i]);
//     }
// }
// function removeZTreeNodeBySelect() {
//     var zTree = $.fn.zTree.getzTreeObj("regionZTree");
//     var nodes = zTree.getSelectedNodes(); //获取选中节点
//     for (var i = 0; i < nodes.length; i++) {
//         zTree.removeNode(nodes[i]);
//     }
// }
// function removeZTreeNodeByChecked() {
//     var zTree = $.fn.zTree.getzTreeObj("regionZTree");
//     var nodes = zTree.getCheckedNodes(true); //获取勾选节点
//     for (var i = 0; i < nodes.length; i++) {
//         zTree.removeNode(nodes[i]);
//     }
// }
// function removeZTreeNodebPi(obj) {
//     var idnodes = obj.split(",");
//     var zTree = $.fn.zTree.getzTreeObj("regionZTree");
//     var nodes = zTree.getSelectedNodes();
//     for (var i = 0; i < nodes.length; i++) {
//         var nodes = zTree.getNodeByParam("id", nodes[i]);
//         zTree.removeNode(nodes);
//     }
// }
// function selectzTreeNode(obj) {
//     var zTree = $.fn.zTree.getzTreeObj("regionZTree");
//     var node = zTree.getNodeByParam("id", obj);
//     if (node != null) {
//         zTree.selectNode(node, true); //指定选中ID的节点
//     }
// }
function find(){
    var flag=0;
    var f=false;
    var studentskills;
    for(var a=0;a<n;a++){
        searchObj=$.fn.zTree.getZTreeObj("regionZTree"+a);
        searchObj.cancelSelectedNode();//取消上一次查找所选的节点
    }
    data=$("#stxt").val();
    for(var j = 0; j < skillnum ; j++) //根据输入的名字，查找他的技能字符串
    {
        var studentname;
        //var studentskills;
        var sss=new String(Arr3[j]);
        var k=sss.indexOf("：");
        studentname = sss.substring(0,k);
        //studentskills = sss.substring(k+1,sss.length);
        if (studentname == data){
            studentskills = sss.substring(k+1,sss.length);
            break;
        }
    }
    for(var a=0;a<n;a++){//遍历n棵树
        searchObj=$.fn.zTree.getZTreeObj("regionZTree"+a);
        searnodes=searchObj.getNodesByParam("menuName",data,null);//根据名字查找到的节点searnodes[0]
        searchObj.selectNode(searnodes[0]);//名字符合的节点设为选中状态
        ssnodes=searchObj.getSelectedNodes();//被选中的节点ssnodes[0]
        if(ssnodes.length>0){//有选中的节点
            flag++;f=true;
            if(flag==1){//只输出一次导师
                searchObj.selectNode(ssnodes[0]);
                ssnodes=searchObj.getNodes();//ssnodes更新为整棵树的节点
                $("#result").text(ssnodes[0].menuName);//ssnodes[0]此时为根节点
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
        //Arr3[skillnum]=
        //Arr3=before; // xx级博士生 / 硕士生  or 名字（说明本行是技能信息）
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
        }else {  // 如果是技能信息，例如：刘六：java、数学建模,则Arr2里面是技能list，Arr3存学生名字+对应技能
            Arr3 =  before + behind ; 
            skillnum ++ ;
        } 
    }
    zzNodes=zTreeObj.getNodes()[0].children;
}
//第一版本
// function secondLayer(){
//     for(var ii=1;ii<Arr.length;ii++){
//         getSname(Arr[ii]);//提取学生名进Arr2
//         zNodes=zTreeObj.getNodes();
//         zTreeObj.selectNode(zNodes[0]);
//         var parentZNode=zTreeObj.getSelectedNodes(); 
//         zTreeObj.addNodes(parentZNode[0], [{menuName:before}], true);
//         zTreeObj.expandAll(true); 
//     }
//     zzNodes=zTreeObj.getNodes()[0].children;
// }

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
//第一版本
// function thirdLayer(){
//     for(var ii=1;ii<Arr.length;ii++){
//         getSname(Arr[ii]);//提取学生名进Arr2
//         var iii=ii-1;
//         zNodes=zTreeObj.getNodes();
//         zTreeObj.selectNode(zzNodes[iii]);
//         var parentZNode = zTreeObj.getSelectedNodes();
//         for(var jj=0;jj<Arr2.length;jj++)
//             zTreeObj.addNodes(parentZNode[0], [{menuName:Arr2[jj]}], true);
//         zTreeObj.expandAll(true); 
//     }
// }
/*
function thirdLayer(first,last){
    var iii=0;
    for(var ii=first+1;ii<last;ii++){//二级数
        getSname(Arr[ii]);//提取学生名进Arr2
        zTreeObj.selectNode(zzNodes[iii]);
        var parentZNode = zTreeObj.getSelectedNodes();
        for(var jj=0;jj<Arr2.length;jj++)
            zTreeObj.addNodes(parentZNode[0], [{menuName:Arr2[jj]}], true);
        zTreeObj.expandAll(true); 
        iii++;
    }
}*/
