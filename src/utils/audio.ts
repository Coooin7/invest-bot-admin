
export class AudioManager{
    private static _audios = new Map<string,HTMLAudioElement>();
    
    public static playSound(url:string){
        let audio = AudioManager._audios.get(url);
        if(audio===undefined){
            audio = new Audio();
            audio.src = url;
            AudioManager._audios.set(url,audio);
            audio.oncanplay = ()=>{
                audio?.play().catch((err=>{
                    console.warn(err)
                }));
            }
            return;
        }
        audio?.play().catch((err=>{
            console.warn(err)
        }));
    }
}