function onClick(event, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(treeId);
    var names = "";
    var ids = "";
    var nodes;
    if (zTree.setting.check.enable == true) {
       zTree.checkNode(treeNode, !treeNode.checked, false);
       nodes = zTree.getCheckedNodes();
    } else{
       nodes = zTree.getSelectedNodes();
    }
    for (var i = 0, l = nodes.length; i < l; i++) {
       names += nodes[i].name + ",";
       ids += nodes[i].id + ",";
    }
    if (names.length > 0) {
        names = names.substring(0, names.length - 1);
        ids = ids.substring(0, ids.length - 1);
    }
    $("#xmtHide").attr("value",names);
    $("#xmtHide").attr("ids",ids);
    $("#xmtShow").attr("value",names);
    $("#xmtShow").attr("ids",ids);
}
 
function onCheck(event, treeId, treeNode) {
    var zTree = $.fn.zTree.getZTreeObj(treeId);
    var nodes = zTree.getCheckedNodes();
    var names = "";
    var ids = "";
    for (var i = 0, l = nodes.length; i < l; i++) {
        names += nodes[i].name + ",";
        ids += nodes[i].id + ",";
    }
    if (names.length > 0) {
        names = names.substring(0, names.length - 1);
        ids = ids.substring(0, ids.length - 1);
    }
}
 
function initTree(fullTreeId,zNodes,myClick,isMultiple,chkboxType){
  var setting = {
        view: {
            dblClickExpand: false,
            showLine: false
        },
        data: {
            simpleData: {
                enable: true
            }
        },
        check: {
            enable: false,
            chkboxType: { "Y": "ps", "N": "s" }
        },
        callback: {
            onClick: myClick? myClick : onClick,
            onCheck: onCheck
        }
 
    };
    if (isMultiple) {
        setting.check.enable = isMultiple;
    }
    if (chkboxType !== undefined && chkboxType != null) {
        setting.check.chkboxType = chkboxType;
    }
     $.fn.zTree.init($("#" + fullTreeId ), setting, zNodes);
}