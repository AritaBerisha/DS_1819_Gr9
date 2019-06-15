using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace EncDecApp
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            cipherText.Text = TextPerm(plainText.Text, perm.Text.Length, perm.Text);
        }

        private void Decrypt_Click(object sender, EventArgs e)
        {
            plainText2.Text = getPlainText(cipherText.Text,perm.Text.Length, perm.Text);
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
        static string TextPerm(string text, int block, string perm)
        {
            string[] BlockTextArray = BlockText(text, block).Split(' ');
            char[] x;
            string ciphertext = "";
            for (int i = 0; i < BlockTextArray.Length - 1; i++)
            {
                x = BlockTextArray[i].ToArray();
                for (int j = 0; j < perm.Length; j++)
                {
                    ciphertext += (x[int.Parse(perm[j].ToString()) - 1]);
                }
                ciphertext += " ";
            }
            return ciphertext;
        }


        static string getPlainText(string str, int block, string perm)
        {
            string[] text = str.Split(' '); 
            List<string> plained = new List<string>();
            foreach (string item in text)
            {
                plained.Add(TextInOrder(item, block, perm)); 
            }
            return (string.Join("", plained));
        }
        static string TextInOrder(string item, int block, string perm)
        {
            List<char> arr = new List<char>();
            List<int> numrat = new List<int>();
            foreach (char i in perm)
            {
                int val = (int)Char.GetNumericValue(i); 
                numrat.Add(val); 
            }
            foreach (char items in item)
            {
                arr.Add(items);
            }
            for (int i = 0; i < item.Length; i++)
            {
                int ind = numrat[i] - 1;
                arr[ind] = item[i];
            }
            return toPlainText(string.Join("", arr));
        }
        static string toPlainText(string array)
        {
            List<char> arrange_text = new List<char>();
            foreach (char item in array)
            {
                if (Char.IsDigit(item)) { array.Replace(item, ' '); }
                else { arrange_text.Add(item); }
            }
            return string.Join("", arrange_text);
        }
    }
}
