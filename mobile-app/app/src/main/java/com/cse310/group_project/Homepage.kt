package com.cse310.group_project

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.fragment.findNavController
import com.cse310.group_project.databinding.HomepageBinding

/**
 * A simple [Fragment] subclass as the default destination in the navigation.
 */
class Homepage : Fragment() {

    private var _binding: HomepageBinding? = null

    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        _binding = HomepageBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.buttonFirst.setOnClickListener {
            findNavController().navigate(R.id.action_Homepage_to_qrScanner)
        }
        binding.cardView.setOnClickListener {
            findNavController().navigate(R.id.action_Homepage_to_webView)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}