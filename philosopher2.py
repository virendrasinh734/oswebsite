from threading import Thread
from threading import Semaphore
import random
import time
import sqlite3

con = sqlite3.connect('phil.db', check_same_thread=False)
cur=con.cursor()
temp=100
# cur.execute("CREATE TABLE philt (sno integer primary key autoincrement, p01 varchar(30),p02 varchar(30),p03 varchar(30),p04 varchar(30),p05 varchar(30));")
# cur.execute(f"INSERT INTO philt (sno, p01, p02, p03, p04, p05) VALUES ({temp},'think','think','think','think','think');")

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
                time.sleep(random.random()*0.1)
                self.status[i] = 'Waiting'
                if self.chopstick[i].acquire(timeout=1):
                    self.chop_hold[i] = 1
                    self.cstat[i] = i + 1
                    time.sleep(random.random()*0.1)
                    if self.chopstick[nxt].acquire(timeout=1):
                        self.chop_hold[i] = 2
                        self.cstat[nxt] = i + 1
                        self.status[i] = 'Eating'
                        time.sleep(random.random()*0.1)
                        self.chopstick[i].release()
                        self.chopstick[nxt].release()
                        self.chop_hold[i] = 0
                        self.cstat[i] = 0
                        self.status[i] = 'Thinking'
        elif i == 4:
            while not self.stop_flag:
                self.status[i] = 'Thinking'
                time.sleep(random.random()*0.1)
                self.status[i] = 'Waiting'
                if self.chopstick[nxt].acquire(timeout=1):
                    self.chop_hold[i] = 1
                    self.cstat[i] = i + 1
                    time.sleep(random.random()*0.1)
                    if self.chopstick[i].acquire(timeout=1):
                        self.chop_hold[i] = 2
                        self.cstat[nxt] = i + 1
                        self.status[i] = 'Eating'
                        time.sleep(random.random()*0.1)
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

    i = 30
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
        try: 
            cur.execute(f"INSERT INTO philt (p01, p02, p03, p04, p05) VALUES ('{lst[0]}','{lst[1]}','{lst[2]}','{lst[3]}','{lst[4]}');")
            con.commit()
        except Exception as e:
            print("Not able to enter this data",e)
        #print("".join("{:3d} ".format(m) for m in dinnning_Philosophers.meals)," : ",str(sum(dinnning_Philosophers.meals)))
        time.sleep(0.1)
        i=i-1
    
    dinnning_Philosophers.stop_threads()
    # con.commit() 
    # con.close()
    for p in phil_arr:
        p.join()
    for i in range(len(phil_state)):
        print(phil_state[i])
        # print(mealss[i])
#     for i in range(len(phil_state)):
#         cur.execute(f"INSERT into philosophers VALUES ({i},{phil_state[i][0]},{phil_state[i][1]},{phil_state[i][2]},{phil_state[i][3]},{phil_state[i][4]}")
#         conn.commit()




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