export class FrutaFavorita {
    
    private selected: boolean;
    
    constructor(public nombre: string, public imagenUrl: string, public color: string, public votes: number = 0){
        this.selected = false;
    }
        
        isSelected(): boolean{
            return this.selected
        }

        setSelected(s: boolean){
            
            this.selected = s;
        
        }

        voteUp(){
            this.votes++;
        }

        voteDown(){
            this.votes--;
        }
    
    }
