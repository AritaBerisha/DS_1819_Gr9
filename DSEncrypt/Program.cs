using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DSEncrypt
{
    class Program
    {
        static void Main(string[] args)
        {

            Console.WriteLine("Write down plaintext.");
            string text = Console.ReadLine();

            Console.WriteLine("Write down the block.");
            int block = Convert.ToInt32(Console.ReadLine());

            Console.WriteLine("Write down the perm formula \n" +
                "(Length must be the same size as the block and must contain only numbers within the block's range).");
            string perm = Console.ReadLine();
            
            TextPerm(text, block, perm);
            
     
            Console.ReadLine();
        }
        static string TextPadding(string text, int block)
        {
            string textPadded = text.Replace(" ", "");
            Random randomNumber = new Random();
            while (textPadded.Length % block != 0)
            {
                textPadded += randomNumber.Next(1, 9);
            }
            return textPadded;
        }
        static string BlockText(string text, int block)
        {
            string blockText = "";
            for (int i = 0; i <= TextPadding(text, block).Length - block; i += block)
            {
                blockText += TextPadding(text, block).Substring(i, block) + " ";
            }
            return blockText;
        }

        static void TextPerm(string text, int block, string perm)
        {
            string[] BlockTextArray = BlockText(text, block).Split(' ');

            char[] x;

            Console.WriteLine("This is your ciphertext:");
            for (int i = 0; i < BlockTextArray.Length - 1; i++)
            {
                x = BlockTextArray[i].ToArray();
                for (int j = 0; j < perm.Length; j++)
                {

                    Console.Write(x[int.Parse(perm[j].ToString()) - 1]);

                }
                Console.Write(" ");
            }


        }
    }
}
