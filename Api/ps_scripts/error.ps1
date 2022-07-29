#create infinite loop in powershell
while(1):
    #get the current time
    current_time = datetime.datetime.now()
    #print the current time
    print(current_time)
    #sleep for 5 seconds
    time.sleep(5)