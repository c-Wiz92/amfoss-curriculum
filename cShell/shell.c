#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#include<unistd.h>

int main(){
    char user_input[] = "This is a sample input. It mimics a shell command, one that would be entered by the user.";
    char delim[] = " ,.";


    __pid_t pid = fork();
    if (pid == 0) {
        execvp();
    }

    char *crr_token = strtok(user_input, delim);
    printf("The first word is: %s", crr_token);

    while (crr_token != NULL){
        crr_token = strtok(NULL, delim);
        printf("\n%s", crr_token);
    }
}





