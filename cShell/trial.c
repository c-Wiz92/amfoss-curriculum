#include<stdio.h>
#include<string.h>
#include<unistd.h>
#include<sys/wait.h>

#define MAX_ARGS 100
#define INPUT 1000

int main(){

    while(1){
        char input[INPUT];
        char *args[MAX_ARGS];
        char *token;
        __pid_t pid;
        int forkstatus;
        int *status = &forkstatus;
        int i = 0;
        printf(">> ");
        
        if(fgets(input, INPUT, stdin) == NULL){
            printf("Exiting shell...\n");
            break;
        }

        input[strcspn(input, "\n")] = '\0';

        token = strtok(input, " ");
        while(token != NULL && i < MAX_ARGS){
            args[i] = token;
            token = strtok(NULL, " ");
            i = i + 1;
        }
        args[i] = NULL;

        // handle exit, empty input
        if (args[0] == NULL){
            continue; 
        }else if(strcmp(args[0], "exit") == 0){
            printf("Exiting shell...\n");
            break;
        }


        pid = fork();

        if (pid > 0){
            waitpid(pid, status, 0);
        }else if (pid == 0){
            execvp(args[0], args);
        }else{
            perror("fork error");
        }
    }
}