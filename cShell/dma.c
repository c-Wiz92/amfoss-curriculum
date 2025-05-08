#include<stdio.h>
#include<string.h>

int execute(command){
    __pid_t pid = fork();
    if (pid == 0){ // child process
        execvp(command[0], command);
    }
    else if (pid > 0) // parent process
    {
        
    }
    else{
        printf("Fork failed");
    }
    return 1;
}

int main(){
    char input[256]; // get the command as user input
    fgets(input, 256, stdin);
 
    char *command[256]; // convert it to a list
    char delims[] = " ";
    char *token = strtok(input, delims);
 
    int i =0;
    while (1){
        if (token){
            command[i] = token;
            token = strtok(NULL, delims);
            i +=1;
        }
        else{
            break;
        }
    }
}