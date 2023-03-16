from threading import Thread
from threading import Semaphore
import random
import time
mealss=[]
phil_state=[]
chops=[]
class Din_Phil:
    def __init__(self,no_of_phil=5, meal_size=3):    
        self.meals=[meal_size for i in range(no_of_phil)]
        self.chopstick=[Semaphore(value=1) for i in range(no_of_phil)]
        self.status=[('  T  ') for i in range(no_of_phil)]
        self.chop_hold=[('    ') for i in range(no_of_phil)]
        # print(self.meals)
        # print(self.chop_hold)
        # print(self.status)
 
    def philosophers(self,i):
        nxt=(i+1)%5
        while self.meals[i]>0:
            self.status[i]='  T  '
            time.sleep(0.5)
            self.status[i]='  _  '
            if self.chopstick[i].acquire(timeout=1):
                print("this is gt")
                self.chop_hold[i]='  /  '
                time.sleep(0.5)
                if self.chopstick[nxt].acquire(timeout=1):
                    print("this is gt2222")
                    self.chop_hold[i]='  /\\  '
                    self.status[i]='  E  '
                    time.sleep(0.5)
                    self.meals[i]-=1
                    self.chopstick[nxt].release()
                    self.chop_hold[i]='  /  '
                self.chopstick[i].release()
                self.chop_hold[i]='    '
                self.status[i]='  T  '

def main():
    no_of_Phil=5
    meals=1
    dinnning_Philosophers=Din_Phil(no_of_Phil,meals)
    phil_arr=[Thread (target=dinnning_Philosophers.philosophers,args=(i,)) for i in range(no_of_Phil)]
    for p in phil_arr:
        p.start()
    while sum(dinnning_Philosophers.meals)>0:
        print("="*25)
        lst=[dinnning_Philosophers.status[0],dinnning_Philosophers.status[1],dinnning_Philosophers.status[2],dinnning_Philosophers.status[3],dinnning_Philosophers.status[4]]
        # print("".join(map(str,dinnning_Philosophers.status))," : ",str(dinnning_Philosophers.status.count('  E  ')))
        # print("".join(map(str, dinnning_Philosophers.chop_hold)))
        # dinnning_Philosophers.meals[0]-=1
        lst2=[dinnning_Philosophers.meals[0],dinnning_Philosophers.meals[1],dinnning_Philosophers.meals[2],dinnning_Philosophers.meals[3],dinnning_Philosophers.meals[4]]
        lst3=[dinnning_Philosophers.chop_hold[i] for i in range(0,5)]
        phil_state.append(lst)
        mealss.append(lst2)
        chops.append(lst3)

        #print("".join("{:3d} ".format(m) for m in dinnning_Philosophers.meals)," : ",str(sum(dinnning_Philosophers.meals)))
        time.sleep(0.1)
    for p in phil_arr:
        p.join()
    for i in range(len(phil_state)):
        print(phil_state[i])
        print(mealss[i])
    
    # print(mealss[0])
    # print(mealss[10])
    # print(mealss[20])
def get_data():
    # update variables and arrays here
    data = {
        'array1':phil_state,
        'array2':mealss,
        'array3':chops
        # add more variables and arrays here
    }
    return data

if __name__ == "__main__":
    main()

