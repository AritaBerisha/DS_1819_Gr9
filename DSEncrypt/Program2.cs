using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DSEncrypt
{
    class Program2
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Write down cyphertext.");
            string str = Console.ReadLine();
            Console.WriteLine("Write down the block.");
            int block = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Write down the perm formula \n" +
                "(Length must be the same size as the block and must contain only numbers within the block's range).");
            string perm = Console.ReadLine();
            getCypherText(str,block,perm);
            Console.ReadLine();
        }
        static string  getCypherText(string str,int block, string perm)
        {   
            string[] text = str.Split(' ');
            List<string> plained = new List<string>();
            foreach(string item in text){ 
                plained.Add(TextInOrder(item,block, perm));
            } 
            return (string.Join("", plained));
        }
        static string TextInOrder(string item,int block, string perm){
          List<char> arr = new List<char>();
          List<int> numrat = new List<int>();
          foreach (char i in perm){
            int val = (int)Char.GetNumericValue(i);
            numrat.Add(val);
          }
          foreach (char items in item)
          {
            arr.Add(items);
          }
          for(int i=0;i<item.Length;i++){
            int ind = numrat[i]-1;
            arr[ind]= item[i];
          }
          return toPlainText(string.Join("",arr));
        }
        static string toPlainText(string array){
          List<char> alto = new List<char>();
          foreach(char item in array){ 
            if(Char.IsDigit(item)){array.Replace(item,' ');}
            else{alto.Add(item);}  
          }
          return string.Join("",alto);
        }
    }
}
