#include<bits/stdc++.h>
using namespace std;

class node
{

    public:
    string key;
    int value;
    node *next;


    node()
    {
        key = "";
        value = 0;
        next = nullptr;
    }
    node(string k, int v)
    {
        key = k;
        value = v;
        next = nullptr;
    }
};

class table
{
    vector<node*> hashvector;
    long int sizeN,inputSize;
    vector<int>chainLengths;
    string whichHash;
    string whichMethod;
    int collision;
    int totalprobe;
    int maxChainLen;
    int totalInsertion;
    int currentsize;///right now je koyta node ase
    int c1=15,c2=31;

public:
    table(int m,string whichHash,string whichMethod, int maxChainlen=1)
    {
        this->whichHash=whichHash;
        this->whichMethod=whichMethod;

        long int s = nextPrime(m);
        sizeN = s;
        inputSize=m;
        hashvector.resize(s,nullptr);
        chainLengths=vector<int>(s,0);
        collision=0;
        totalprobe=0;
        this->maxChainLen=maxChainLen;
        totalInsertion=0;
        currentsize=0;
    }

    int getTableSize(){
        return inputSize;
    }

   bool isPrime(int number){
        if(number==1){
            return true;
        }
        for(int i=2; i<number/2 ; i++){
            if(number%i==0){
                return false;
            }
        }

        return true;
    }

    int nextPrime(int number){

        int i= number+1;
        while(true){
           if(isPrime(i)){
            return i;
           }
           i++;
        }
    }


    int getMaxChainLength(){
        int m=chainLengths[0];
        int in=0;
        for(int i=0;i<chainLengths.size();i++){
            if(chainLengths[i]>m){
                m=chainLengths[i];
                in=i;
            }
        }
        return m;
    }

    int hash1(string key){//Polynomial Rolling Hash Function
        int hash = 0;
        int n = sizeN;
        for(int i = 0; i<key.length();  i++){
            hash = 37*hash+key[i];
        }
        hash %= n;
        if(hash<0){
            hash += n;
        }
        return hash;
    }
    int hash2(string key){// x-or shift hash
        unsigned int n = sizeN;
        int hash = 0;
        for (char c : key){
            hash = (hash ^ ((c - 'a' + 1) + (hash<<5) + (hash>>2) ))%n;
        }
        if(hash<0){
            hash+=n;
        }
        return hash%n ;
    }

    int aux_hash(string key){
        int hash = 1;
        int n = sizeN;
        for(int i = 0; i<key.length();  i++){
            hash = ((hash*37) + ((int)key[i]))%n;
        }
        hash =(hash*10 + 1)% n;
        if(hash<0) hash += n;
        return hash;
    }

    void insert(string key,int value){
        if(find(key,0) != nullptr){
            return;
        }
        if(whichMethod=="seperate_chainning" ){
            if( (totalInsertion%100==0) && getMaxChainLength()>=maxChainLen){
                rehash();
            }

            int index;

            if(whichHash=="hash1"){
                index=hash1(key);
            }
            else if(whichHash=="hash2"){
                index=hash2(key);
            }
            else{
                cout<<"hash fn not defined"<<endl;

            }


            node* newNode= new node(key,value);
            totalInsertion++;
            if(hashvector[index]== nullptr){
            //     if(inputSize<=5000)
            // cout<<"inside  insert  "<<index<<endl;

                hashvector[index]=newNode;
                currentsize++;
                chainLengths[index]++;
            }
            else{
                collision++;
                newNode->next=hashvector[index];
                hashvector[index] =newNode;
                currentsize++;
                chainLengths[index]++;
            }
        }
        else{
            cout<< "hi";

            if(find(key,0)!= nullptr){
                find(key)->value=value;
                return;
            }

             int hashValue,auxHashValue,trial=0;
             int finalhashValue;

            auxHashValue=aux_hash(key);

            if(whichHash=="hash1"){
                hashValue=hash1(key);
            }
            else if(whichHash=="hash2"){
                hashValue=hash2(key);
            }
            else{
                cout<<"hash fn not defined"<<endl;

            }

            for(int trial=0;trial<sizeN;trial++){
                if(whichMethod=="double_hashig"){
                    finalhashValue=(hashValue + trial * auxHashValue)%sizeN;
                    //cout<<"double hash "<<finalhashValue<<endl;
                }
                else if(whichMethod=="custom_probbing"){
                    finalhashValue=(hashValue + c1*trial*auxHashValue +c2*trial*trial)%sizeN;
                    //cout<<"custom "<<finalhashValue<<endl;
                }
                else{
                    cout<<"eta aba rkon method?"<<endl;
                }

                if(hashvector[finalhashValue]==nullptr){
                    node* newNode=new node(key,value);
                    hashvector[finalhashValue]=newNode;
                    currentsize++;
                    totalInsertion++;
                    return;
                }
                collision++;


            }


        }


    }




    void rehash(){

    }

    //returns the node pointer
    node* find(string key,int flag=1){


        if(whichMethod == "seperate_chainning"){

            //if(flag==1)
            //cout<<"inside spc"<<endl;
            int index;
            if(whichHash=="hash1"){
                index=hash1(key);
            }
            else if(whichHash=="hash2"){
                index=hash2(key);
            }
            else{
                cout<<"hash fn not defined"<<endl;

            }


            if(hashvector[index]==nullptr){
                 if(flag==1){
                 cout<<"incresin "<<totalprobe<<endl;
                 totalprobe++;
                 }
                return nullptr;
            }

            node* current=hashvector[index];
            do{
                if(flag==1){
                   // cout<<"increasing "<<totalprobe<<endl;
                totalprobe++;
                }

                if(current->key == key){

                    return current;
                }

                current=current->next;
            }while(current!=nullptr);

            return nullptr;

        }
        else if(whichMethod == "double_hashig"){
            int hashValue,auxHashValue,trial=0;

            auxHashValue=aux_hash(key);

            if(whichHash=="hash1"){
                hashValue=hash1(key);
            }
            else if(whichHash=="hash2"){
                hashValue=hash2(key);
            }
            else{
                cout<<"hash fn not defined"<<endl;

            }

            int doubleHashVAlue=hashValue;
            //doubleHash(k, i) = (Hash(k) + i × auxHash(k)) % N;

            while (trial<sizeN && hashvector[doubleHashVAlue] !=nullptr)
            {
                doubleHashVAlue=(hashValue + trial * auxHashValue)%sizeN;
                //cout<<"double hash value "<<doubleHashVAlue<<endl;
                if(hashvector[doubleHashVAlue]!=nullptr && hashvector[doubleHashVAlue]->key == key){
                    if(flag==1){
                        //cout<<"increasing dh"<<totalprobe<<endl;
                    totalprobe++;
                    }

                    //cout<<"returning double hash"<<endl;
                    return hashvector[doubleHashVAlue];
                }
                if(flag==1){
                   // cout<<"increasing dh"<<totalprobe<<endl;
                totalprobe++;
                }
                trial++;
            }
            return nullptr;






        }
        else if(whichMethod=="custom_probbing"){


            int hashValue,auxHashValue,trial=0;

            auxHashValue=aux_hash(key);

            if(whichHash=="hash1"){
                hashValue=hash1(key);
            }
            else if(whichHash=="hash2"){
                hashValue=hash2(key);
            }
            else{
                cout<<"hash fn not defined"<<endl;

            }

            for(int probe=0; probe<sizeN ; probe++){
                int customValue=(hashValue + c1*probe*auxHashValue +c2*probe*probe)%sizeN;
                if(hashvector[customValue] != nullptr && hashvector[customValue]->key==key){
                    if(flag==1)
                    totalprobe++;
                    return hashvector[customValue] ;
                }
                if(flag==1)
                totalprobe++;
            }

            return nullptr;


        }
        else{
            cout<<"method not defined lol"<<endl;
            return nullptr;
        }
    }


    void printTable()
    {
        cout << "Hash Table:" << endl;
        for (int i = 0; i < sizeN; i++)
        {
            cout << "Chain " << i << ": ";
            node *current = hashvector[i];
            while (current != nullptr)
            {
                cout << "(" << current->key << ", " << current->value << ") ";
                current = current->next;
            }
            cout << endl;
        }
    }

    int getCollisionCount(){
        return collision;
    }
    int getCurrentNodes(){
        return currentsize;
    }
    int getTotalInsertion(){
        return totalInsertion;
    }
    int getProbcount(){
        return totalprobe;
    }

    string delet(string key){
        int pos;
        if(whichMethod == "seperate_chainning"){
            if(whichHash =="hash1"){
                pos= hash1(key);
            }
            else{
                pos=hash2(key);
            }
            if(hashvector[pos] == nullptr){
                return NULL;
            }

            node* temp=hashvector[pos];
            node* prev=nullptr;
            do{
                if(temp->key==key){
                    if(prev==nullptr){
                        node* t=hashvector[pos];
                        hashvector[pos]=t->next;
                        string str=t->key;
                        delete t;
                        currentsize--;
                        return str;
                    }
                    else{
                        prev->next=temp->next;
                        string str=temp->key;
                        delete temp;
                        currentsize--;
                        return str;

                    }
                    
                }
                prev=temp;
                
            }while(temp=temp->next);

            return NULL;
        }
        else if(whichMethod =="double_hash"){
             int hashValue,auxHashValue,trial=0;

            auxHashValue=aux_hash(key);

            if(whichHash=="hash1"){
                hashValue=hash1(key);
            }
            else if(whichHash=="hash2"){
                hashValue=hash2(key);
            }
            else{
                cout<<"hash fn not defined"<<endl;

            }

            int doubleHashVAlue=hashValue;
            //doubleHash(k, i) = (Hash(k) + i × auxHash(k)) % N;

            while (trial<sizeN && hashvector[doubleHashVAlue] !=nullptr)
            {
                doubleHashVAlue=(hashValue + trial * auxHashValue)%sizeN;
                //cout<<"double hash value "<<doubleHashVAlue<<endl;
                if(hashvector[doubleHashVAlue]!=nullptr){
                   if(hashvector[doubleHashVAlue]->key == key){
                    string str= hashvector[doubleHashVAlue]->key;
                        delete hashvector[doubleHashVAlue];
                        hashvector[doubleHashVAlue]=nullptr;
                        currentsize--;
                        return str;
                   }

                   
                }
                
                trial++;
            }
            return NULL;
        }
        else if(whichMethod=="custom_probbing"){
            
            int hashValue,auxHashValue,trial=0;

            auxHashValue=aux_hash(key);

            if(whichHash=="hash1"){
                hashValue=hash1(key);
            }
            else if(whichHash=="hash2"){
                hashValue=hash2(key);
            }
            else{
                cout<<"hash fn not defined"<<endl;

            }
            int customValue=hashValue;
            while(true){
                if(trial == sizeN){
                    break;
                }
                customValue=(hashValue + c1*trial*auxHashValue +c2*trial*trial)%sizeN;
                if(hashvector[customValue]->key==key){
                    string str=hashvector[customValue]->key;
                    delete hashvector[customValue];
                    return str;
                }
                trial++;
            }

            return NULL;

        }
    }
    






};


void randWords(vector<pair<string,int>>& randomWords,int n){
    string alpha="abcdefghijklmnopqrstuvwxyz";
    set<string> uniqe_words;
    while(uniqe_words.size() != n){
        int len= 5+ rand()%6;
        string word;
        for(int i=0;i<len;i++){
            int letter= rand()%26;
            word+= alpha[letter];
        }
        int prevsize=uniqe_words.size();
        uniqe_words.insert( word);
        if(uniqe_words.size() > prevsize){
        randomWords.push_back({word,uniqe_words.size()});
        }
    }
}






int main()
{

    //freopen("rough.txt", "w",stdout);
    string h1="hash1";
    string h2="hash2";
    string sc="seperate_chainning";
    string dh="double_hashig";
    string cp="custom_probbing";

    vector<pair<string,int>> testInputs;
    randWords(testInputs,10000);

    vector<table> hashtbles;
    //table ht1_h1_sc_5000(5000,h1,sc,100);
    //table ht2_h2_sc_5000(5000,h2,sc,100);
    // table ht3_h1_dh_5000(5000,h1,dh);
    //table ht4_h2_dh_5000(5000,h2,dh);
     //table ht5_h1_cp_5000(5000,h1,cp);
     // table ht6_h2_cp_5000(5000,h2,cp);
      //table ht7_h1_sc_10000(10000,h1,sc,100);
         //table ht8_h2_sc_10000(10000,h2,sc,100);
         //table ht9_h1_dh_10000(10000,h1,dh);

         //table ht10_h2_dh_10000(10000,h2,dh);
    // table ht11_h1_cp_10000(10000,h1,cp);
    table ht12_h2_cp_10000(10000,h2,cp);

     //table ht13_h1_sc_20000(20000,h1,sc,100);
     //table ht14_h2_sc_20000(20000,h2,sc,100);
    // table ht15_h1_dh_20000(20000,h1,dh);
    // table ht16_h2_dh_20000(20000,h2,dh);
     //table ht17_h1_cp_20000(20000,h1,cp);
     //table ht18_h2_cp_20000(20000,h2,cp);

   
    
    for(pair<string,int> x: testInputs){
        cout<< "test1";
            ht12_h2_cp_10000.insert(x.first,x.second);

    }
     cout<< "hillol";
    // for(int i=0;i<testInputs.size();i++){
    //        ht17_h1_cp_20000.insert(testInputs[i].first,testInputs[i].second);

    // }
    
    // ht7_h1_sc_10000.insert(testInputs[0].first,testInputs[0].second);
     ht12_h2_cp_10000.printTable();

       
        // for(int i=0; i<1000 ; i++){
        //     int index=rand()%1000;

        //     ht17_h1_cp_20000.find( testInputs[index].first);

        // }
    

     cout<<ht12_h2_cp_10000.find(testInputs[3000].first)->key<<endl;

    cout<<ht12_h2_cp_10000.getCollisionCount()<<" "<<ht12_h2_cp_10000.getProbcount()<<endl;



     
    
    
    

   
    
    
    



    //  for(int i=0;i<hashtbles.size();i++){
    //     for(int i=0; i<1000 ; i++){
    //         int index=rand()%10000;

    //         hashtbles[i].find( testInputs[index].first);

    //     }
    // }


    //generateReport(hashtbles);
}