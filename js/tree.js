;(function($){
    $.fn.makeTree = function(opt){
        var ele = $(this)
        ele.on('mouseover','.tree_main',function (e) {
            e.stopPropagation()
            $(this).addClass('active')
        })
        ele.on('mouseout','.tree_main',function(e){
            e.stopPropagation()
            $(this).removeClass('active')
        })
        ele.on('click','.tree_item',function(e){
            e.stopPropagation()
            if($(this).hasClass('haschildren')){
                if($(this).hasClass('active')){
                    $($(this).removeClass('active').find('ul')[0]).hide()
                    $(this).find('ul').hide()
                    $(this).find('.tree_item').removeClass('active')
                }else{
                    $($(this).addClass('active').find('ul')[0]).show();
                    opt.openChild('openChild')
                }
            }
        })
        ele.on('click','.tree_main',function(e){
            e.stopPropagation()
            $('.tree_item').removeClass('open')
            $(this).parent().addClass('open')
            var pid = $(this).attr('data-pid')
            if(pid){
                var html = ''
                var list = $(this).parents('.tree_item');
                for(var i = list.length-1; i>=0;i--){
                    var title = $(list[i]).text().substring(0,$(list[i]).text().indexOf('('))
                    html+='<span><b>&gt;</b>'+title+'</span>'
                }
                $('.bread').find('span').remove();
                var me = $(this).find('p').text().substring(0,$(this).find('p').text().indexOf('('))
                // html+= '<span><b>&gt;</b>'+me+'</span>'
                $('.bread').append(html)
            }else{
                var title = $(this).find('p').text().substring(0,$(this).find('p').text().indexOf('('))
                $('.bread').find('span').remove();
                $('.bread').append('<span><b>&gt;</b>'+title+'</span>')
            }
            opt.intemClick('itemclick')
        })
        ele.on('click','.new',function(e){
            e.stopPropagation()
            if($(this).parents('.tree_item').length>= opt.maxLevel){
                alert('最多只支持'+opt.maxLevel+'级！')
                return
            }
            var li = $(this).parent().parent().parent()
            $(li.addClass('active').find('ul')[0]).show();
            var html1 = '<li class="tree_item">' +
                '<input type="text" class="active newInput">' +
                '</li>'
            if(li.find('ul').find('li').length>0){
                $(html1).insertBefore(li.addClass('haschildren').find('ul').find('li')[0])
            }else{
                li.addClass('haschildren').find('ul').append(html1)
            }
            li.find('input.active')[0].focus()
        })
        ele.on('blur','input.newInput',function(){
            var ul = $(this).parent().parent();
            var val = $(this).val()||'新增节点'
            var html = '<li class="tree_item">\n' +
                '<div class="tree_main">\n' +
                '<p>'+val+'</p>\n' +
                '<input type="text" class="editInput">\n' +
                '<div class="domain">\n' +
                '<span class="new"></span>\n' +
                '<span class="edit"></span>\n' +
                '<span class="delete"></span>\n' +
                '</div>\n' +
                '</div>\n' +
                '<ul></ul>\n' +
                '</li>'
            ul.append(html)
            opt.newItem(val)
            $(this).parent().remove();
        })
        ele.on('blur','.tree_main input.editInput',function(){
            if($(this).val()){
                if($(this).attr('data-num')){
                    $(this).siblings('p').html(this.value+$(this).attr('data-num'))
                }else{
                    $(this).siblings('p').html(this.value)
                }
            }
            opt.editMe($(this).val())
            $(this).removeClass('active').siblings('.domain').removeClass('hide');
        })
        ele.on('click','.edit',function(e){
            e.stopPropagation()
            var li = $(this).parent().parent().parent();
            var old = $(li.find('p')[0]).text()
            var oldMain = $(li.find('p')[0]).text().substring(0,$(li.find('p')[0]).text().indexOf('('))
            var num = $(li.find('p')[0]).text().substr($(li.find('p')[0]).text().indexOf('('),10000)
            $(li.find('input')[0]).addClass('active').val(oldMain).focus().attr('data-num',num)
        })
        ele.on('click','.delete',function(e){
            e.stopPropagation()
            var li = $(this).parent().parent().parent()
            if(li.find('li').length>0){
                alert('不可删除，有子节点')
                return
            }
            if(li.siblings().length == 0){
                li.parent().parent().removeClass('haschildren')
            }
            opt.delete('deleted')
            li.remove()
        })
        ele.on('click','.tree_title span',function(e){
            var html = '<li class="tree_item">' +
                '<input type="text" class="active newInput">' +
                '</li>'
            if($(ele.find('ul')[0]).find('li').length>0){
                $(html).insertBefore($($('.tree_box').find('ul')[0]).find('li')[0])
            }else{
                $($('.tree_box').find('ul')[0]).append(html)
            }
            ele.find('input.active')[0].focus()
        })
        function init(arr){
            function InitTree(arr){
                var html = ''
                for(var i = 0;i< arr.length;i++){
                    if(arr[i].children.length>0){
                        html += '<li class="tree_item haschildren">'
                    }else{
                        html += '<li class="tree_item">'
                    }
                    html += '<div class="tree_main" data-id="'+arr[i].id+'" data-pid="'+arr[i].pid+'">' +
                        '<p title="'+arr[i].name+'">'+arr[i].name+'('+arr[i].count+')</p>' +
                        '<input type="text" class="editInput">' +
                        '<div class="domain">' +
                        '<span class="new"></span>' +
                        '<span class="edit"></span>' +
                        '<span class="delete"></span>' +
                        '</div>' +
                        '</div>' +
                        '<ul>'
                    if(arr[i].children.length>0){
                        html += InitTree(arr[i].children)
                    }
                    html+='</ul></li>'
                }
                return html
            }
            var ht = InitTree(arr)
            ele.find('ul').append(ht);
        }
        init(opt.data)
    }
})(jQuery)