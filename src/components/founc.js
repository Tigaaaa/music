export const analysLyric=(lyric)=>{
    let ly_temp=lyric.split('\n');
    let newly=[];
    for(let l of ly_temp){
        if(l){
            let ly_temp=l.split(']');
            let text=ly_temp.pop();

            let time=ly_temp[0].split('[').pop();
            let minut=time.split(':')[0];
            let miao=time.split(':')[1];
            time=parseInt(minut)*60+parseInt(miao);

            let obj={time,text};
            newly.push(obj);
        }
    }
    return newly;
}

export const shuffle=(list,nowIndex)=>{
    let len=list.length;
    let newL=list.slice();
    newL.forEach((song,index)=>{
        if(index!=nowIndex){
            let i=Math.floor(Math.random()*(len-1))+1;
            i=(index+i)%len;
            if(i!=nowIndex){
                let temp=song;
                song=newL[i];
                newL[i]=temp;
            }
        }
    });
    return newL;
}