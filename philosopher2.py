from threading import Thread
from threading import Semaphore
import random
import time

mealss=[]
phil_state=[]
chops=[]
cst=[]
class Din_Phil:
    def __init__(self, no_of_phil=5):    
        self.chopstick = [Semaphore(value=1) for i in range(no_of_phil)]
        self.status = [('Thinking') for i in range(no_of_phil)]
        self.chop_hold = [(0) for i in range(no_of_phil)]
        self.cstat = [0 for i in range(no_of_phil)]
        self.stop_flag = False

    def philosophers(self, i):
        nxt = (i + 1) % 5
        if i < 4:
            while not self.stop_flag:
                self.status[i] = 'Thinking'
                time.sleep(0.5)
                self.status[i] = '  _  '
                if self.chopstick[i].acquire(timeout=1):
                    self.chop_hold[i] = 1
                    self.cstat[i] = i + 1
                    time.sleep(0.5)
                    if self.chopstick[nxt].acquire(timeout=1):
                        self.chop_hold[i] = 2
                        self.cstat[nxt] = i + 1
                        self.status[i] = 'Eating'
                        time.sleep(0.5)
                        self.chopstick[i].release()
                        self.chopstick[nxt].release()
                        self.chop_hold[i] = 0
                        self.cstat[i] = 0
                        self.status[i] = 'Thinking'
        elif i == 4:
            while not self.stop_flag:
                self.status[i] = 'Thinking'
                time.sleep(0.5)
                self.status[i] = '  _  '
                if self.chopstick[nxt].acquire(timeout=1):
                    self.chop_hold[i] = 1
                    self.cstat[i] = i + 1
                    time.sleep(0.5)
                    if self.chopstick[i].acquire(timeout=1):
                        self.chop_hold[i] = 2
                        self.cstat[nxt] = i + 1
                        self.status[i] = 'Eating'
                        time.sleep(0.5)
                        self.chopstick[i].release()
                        self.chopstick[nxt].release()
                        self.chop_hold[i] = 0
                        self.cstat[i] = 0
                        self.status[i] = 'Thinking'

    def stop_threads(self):
        self.stop_flag = True


def main():
    no_of_Phil = 5
    dinnning_Philosophers = Din_Phil(no_of_Phil)
    phil_arr = [Thread(target=dinnning_Philosophers.philosophers, args=(i,)) for i in range(no_of_Phil)]
    for p in phil_arr:
        p.start()

    i = 10
    while i>0:
        print("="*25)
        lst=[dinnning_Philosophers.status[0],dinnning_Philosophers.status[1],dinnning_Philosophers.status[2],dinnning_Philosophers.status[3],dinnning_Philosophers.status[4]]
        # print("".join(map(str,dinnning_Philosophers.status))," : ",str(dinnning_Philosophers.status.count('  E  ')))
        # print("".join(map(str, dinnning_Philosophers.chop_hold)))
        # dinnning_Philosophers.meals[0]-=1
        # lst2=[dinnning_Philosophers.meals[0],dinnning_Philosophers.meals[1],dinnning_Philosophers.meals[2],dinnning_Philosophers.meals[3],dinnning_Philosophers.meals[4]]
        lst3=[dinnning_Philosophers.chop_hold[i] for i in range(0,5)]
        lst4=[dinnning_Philosophers.cstat[i] for i in range(0,5)]

        phil_state.append(lst)
        # mealss.append(lst2)
        chops.append(lst3)
        cst.append(lst4)
        #print("".join("{:3d} ".format(m) for m in dinnning_Philosophers.meals)," : ",str(sum(dinnning_Philosophers.meals)))
        time.sleep(1)
        i=i-1
    
    dinnning_Philosophers.stop_threads()

    for p in phil_arr:
        p.join()
    for i in range(len(phil_state)):
        print(phil_state[i])
        # print(mealss[i])
    
    # print(mealss[0])
    # print(mealss[10])
    # print(mealss[20])
    
def get_data():
    # update variables and arrays here
    data = {
        'array1':phil_state,
        'array3':chops,
        'array4':cst
        # add more variables and arrays here
    }
    return data

if __name__ == "__main__":
    main()

