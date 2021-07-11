export const sizeFormat = size => {
    if(size > 1024*1024*1024) {
        return (size/(1000*1000*1000)).toFixed(1) + ' GB';
    }
    if(size > 1024*1024) {
        return (size/(1000*1000)).toFixed(1) + ' MB';
    }
    if(size > 1024) {
        return (size/1000).toFixed(1) + ' KB';
    }
    return size + ' B';
}